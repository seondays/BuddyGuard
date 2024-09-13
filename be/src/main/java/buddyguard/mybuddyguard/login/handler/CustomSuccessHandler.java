package buddyguard.mybuddyguard.login.handler;

import buddyguard.mybuddyguard.jwt.JwtUtil;
import buddyguard.mybuddyguard.jwt.Tokens;
import buddyguard.mybuddyguard.login.dto.CustomOAuth2User;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

/**
 * 로그인이 성공하는 경우 동작하는 핸들러 클래스
 */
@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;

    public CustomSuccessHandler(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        // 성공 후 토큰 생성하기
        CustomOAuth2User oAuth2UserDetails = (CustomOAuth2User) authentication.getPrincipal();

        Long userId = oAuth2UserDetails.getId();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority authority = iterator.next();
        String role = authority.getAuthority();

        String refreshToken = jwtUtil.createJwt(userId, role, Tokens.REFRESH, 7 * 24 * 60 * 60L);
        String accessToken = jwtUtil.createJwt(userId, role, Tokens.ACCESS, 10 * 60L);

        // body에 토큰 저장
        Map<String, String> bodyMap = new HashMap<>();
        bodyMap.put("refresh", "Bearer " + refreshToken);
        bodyMap.put("access", "Bearer " + accessToken);

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(bodyMap);

        response.getWriter().write(body);
    }

    /**
     * 쿠키를 생성한다.
     * @param key
     * @param value
     * @return
     */
    public Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60 * 60);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        return cookie;
    }
}
