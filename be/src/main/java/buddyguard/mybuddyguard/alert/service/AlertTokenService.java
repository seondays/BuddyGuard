package buddyguard.mybuddyguard.alert.service;

import buddyguard.mybuddyguard.alert.entity.UserToken;
import buddyguard.mybuddyguard.alert.repository.UserTokenRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlertTokenService {

    private final UserTokenRepository userTokenRepository;

    public void saveToken(Long userId, String fcmToken) {
        userTokenRepository.save(new UserToken(userId, fcmToken));
    }

    public List<String> getTokensByUserId(Long userId) {
        return userTokenRepository.findByUserId(userId)
                .stream()
                .map(UserToken::getFcmToken)
                .toList();
    }
}
