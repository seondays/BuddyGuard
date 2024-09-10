package buddyguard.mybuddyguard.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * JWT 토큰과 관련된 작업들을 진행하는 클래스
 */
@Component
public class JwtUtil {
    private final SecretKey secretKey;

    public JwtUtil(@Value("${spring.jwt.secret}") String secret) {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),
                SIG.HS256.key().build().getAlgorithm());
    }

    /**
     * JWT 토큰을 생성합니다
     * @param userId
     * @param role
     * @param expiredSeconds
     * @return
     */
    public String createJwt(Long userId, String role, Long expiredSeconds) {
        return Jwts.builder()
                .claim("userId", userId)
                .claim("role", role)
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusSeconds(expiredSeconds)))
                .signWith(secretKey)
                .compact();
    }
}
