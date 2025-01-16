package buddyguard.mybuddyguard.jwt.mapper;

import buddyguard.mybuddyguard.jwt.entity.RefreshToken;
import buddyguard.mybuddyguard.jwt.repository.dto.StoredRefreshToken;


public class RefreshTokenMapper {
    public static StoredRefreshToken toStoredRefreshToken(RefreshToken refreshToken) {
        return new StoredRefreshToken(refreshToken.getUserId(), refreshToken.getExpiration());
    }
}
