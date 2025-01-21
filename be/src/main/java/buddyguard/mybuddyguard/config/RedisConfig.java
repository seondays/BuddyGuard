package buddyguard.mybuddyguard.config;

import buddyguard.mybuddyguard.invitation.repository.dto.StoredInvitationInformation;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String redisHost;

    @Value("${spring.data.redis.port}")
    private int redisPort;

    @Bean
    public LettuceConnectionFactory lettuceConnectionFactory() {
        LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
                .commandTimeout(Duration.ofSeconds(3))  // 3초동안 Redis 응답 없으면 timeout
                .shutdownTimeout(Duration.ZERO)         // 종료 시 기다림 없이 바로 종료
                .build();
        return new LettuceConnectionFactory(new RedisStandaloneConfiguration(redisHost, redisPort),
                clientConfig);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(LettuceConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory);

        // 메타정보 제거를 위해 ObjectMapper 따로 선언
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.deactivateDefaultTyping();

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer(objectMapper));

        return redisTemplate;
    }

    @Bean
    public RedisTemplate<String, StoredInvitationInformation> invitationRedisTemplate(
            LettuceConnectionFactory connectionFactory) {
        RedisTemplate<String, StoredInvitationInformation> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.deactivateDefaultTyping();

        Jackson2JsonRedisSerializer<StoredInvitationInformation> serializer =
                new Jackson2JsonRedisSerializer<>(objectMapper, StoredInvitationInformation.class);

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(serializer);

        return redisTemplate;
    }
}
