package buddyguard.mybuddyguard.jwt.service;

import buddyguard.mybuddyguard.jwt.JwtUtil;
import buddyguard.mybuddyguard.jwt.Tokens;
import buddyguard.mybuddyguard.login.exception.NotAccessTokenException;
import buddyguard.mybuddyguard.login.exception.TokenExpiredException;
import buddyguard.mybuddyguard.login.exception.TokenNotFountException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    private final JwtUtil jwtUtil;

    public TokenService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public String reissueAccessToken(String refresh) {
        if (refresh == null) {
            throw new TokenNotFountException(HttpStatus.UNAUTHORIZED, "unauthorized token");
        }
        // 만료 확인
        if (jwtUtil.isExpired(refresh)) {
            throw new TokenExpiredException(HttpStatus.UNAUTHORIZED, "unauthorized token");
        }
        // 리프레시 확인
        Tokens tokenType = jwtUtil.getTokenType(refresh);
        if (tokenType != Tokens.REFRESH) {
            throw new NotAccessTokenException(HttpStatus.UNAUTHORIZED, "unauthorized token");
        }

        Long userId = jwtUtil.getUserId(refresh);
        String userRole = jwtUtil.getRole(refresh);

        return jwtUtil.createJwt(userId, userRole, Tokens.ACCESS, 10 * 60L);
    }
}
