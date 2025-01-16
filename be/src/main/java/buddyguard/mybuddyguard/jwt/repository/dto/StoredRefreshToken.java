package buddyguard.mybuddyguard.jwt.repository.dto;

public record StoredRefreshToken(
        long userId,
        String expiration) {

}
