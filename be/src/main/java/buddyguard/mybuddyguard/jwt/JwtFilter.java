package buddyguard.mybuddyguard.jwt;

import buddyguard.mybuddyguard.login.dto.CustomOAuth2User;
import buddyguard.mybuddyguard.login.dto.UserDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String authorization = null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("Authorization")) {
                authorization = cookie.getValue();
            }
        }
        if (authorization == null) {
            filterChain.doFilter(request, response);
            return;
        }
        if (jwtUtil.isExpired(authorization)) {
            filterChain.doFilter(request, response);
            return;
        }

        Long userId = jwtUtil.getUserId(authorization);
        String role = jwtUtil.getRole(authorization);
        String name = jwtUtil.getName(authorization);

        UserDto userDto = new UserDto();
        userDto.setId(userId);
        userDto.setName(name);
        userDto.setRole(role);

        CustomOAuth2User customOAuth2User = new CustomOAuth2User(userDto);
        Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null,
                customOAuth2User.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);
    }
}
