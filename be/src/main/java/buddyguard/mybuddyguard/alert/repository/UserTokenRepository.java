package buddyguard.mybuddyguard.alert.repository;

import buddyguard.mybuddyguard.alert.entity.UserToken;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserTokenRepository extends JpaRepository<UserToken, Long> {

    List<UserToken> findByUserId(Long userId);
}
