package buddyguard.mybuddyguard.config;

import buddyguard.mybuddyguard.jwt.JwtFilter;
import buddyguard.mybuddyguard.jwt.JwtUtil;
import buddyguard.mybuddyguard.login.exception.CustomAuthenticationEntryPoint;
import buddyguard.mybuddyguard.login.handler.CustomSuccessHandler;
import buddyguard.mybuddyguard.login.service.OAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final OAuth2UserService oAuth2UserService;
    private final CustomSuccessHandler customSuccessHandler;
    private final CustomAuthenticationEntryPoint entryPoint;
    private final JwtUtil jwtUtil;

    public SecurityConfig(OAuth2UserService oAuth2UserService,
            CustomSuccessHandler customSuccessHandler, JwtUtil jwtUtil,
            CustomAuthenticationEntryPoint entryPoint) {
        this.oAuth2UserService = oAuth2UserService;
        this.customSuccessHandler = customSuccessHandler;
        this.entryPoint = entryPoint;
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // 개발환경 csrf 비활성, 폼로그인이랑 베이직 방식도 쓰지 않을 기능이라 함께 비활성
        http.csrf(AbstractHttpConfigurer::disable);
        http.formLogin(AbstractHttpConfigurer::disable);
        http.httpBasic(AbstractHttpConfigurer::disable);

        http.oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfoEndpointConfig ->
                        userInfoEndpointConfig.userService(oAuth2UserService))
                .successHandler(customSuccessHandler));

        http.authorizeHttpRequests(
                auth -> auth.requestMatchers("/", "/login", "/oauth2**", "/swagger-ui/**",
                                "/api-docs/**", "/swagger-ui.html", "/v3/api-docs/**", "/v3/api-docs",
                                "/reissue")
                        .permitAll()
                        .anyRequest().authenticated());

        http.sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http
                .addFilterBefore(new JwtFilter(jwtUtil, entryPoint),
                        UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
