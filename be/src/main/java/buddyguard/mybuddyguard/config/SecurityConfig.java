package buddyguard.mybuddyguard.config;

import buddyguard.mybuddyguard.login.handler.CustomSuccessHandler;
import buddyguard.mybuddyguard.login.service.OAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final OAuth2UserService oAuth2UserService;
    private final CustomSuccessHandler customSuccessHandler;

    public SecurityConfig(OAuth2UserService oAuth2UserService,
            CustomSuccessHandler customSuccessHandler) {
        this.oAuth2UserService = oAuth2UserService;
        this.customSuccessHandler = customSuccessHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // 개발환경 csrf 비활성, 폼로그인이랑 베이직 방식도 쓰지 않을 기능이라 함께 비활성
        http.csrf(AbstractHttpConfigurer::disable);
        http.formLogin(AbstractHttpConfigurer::disable);
        http.httpBasic(AbstractHttpConfigurer::disable);

        http.oauth2Login(oauth2 -> oauth2.userInfoEndpoint(
                        userInfoEndpointConfig -> userInfoEndpointConfig.userService(
                                oAuth2UserService))
                .successHandler(customSuccessHandler));

        http.authorizeHttpRequests(
                auth -> auth.requestMatchers("/", "/login", "/oauth2**").permitAll()
                        .anyRequest().authenticated());

        http.sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
