package buddyguard.mybuddyguard.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://175.124.214.65:5173",  // 로컬 IP 주소
                        "http://buddyguard.site:5173", // 도메인 주소
                        "http://localhost:5173",
                        "http://buddyguard.site",
                        "http://buddyguard.site:8081",
                        "http://localhost:8080"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드 설정
                .allowedHeaders("Authorization", "Content-Type") // 허용할 헤더 설정
                .allowCredentials(true); // 인증 정보 허용
    }
}
