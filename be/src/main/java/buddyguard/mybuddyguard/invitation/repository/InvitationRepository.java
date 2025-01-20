package buddyguard.mybuddyguard.invitation.repository;

import buddyguard.mybuddyguard.invitation.entity.InvitationInformation;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class InvitationRepository {

    private final RedisTemplate<String, InvitationInformation> redisTemplate;

    public InvitationRepository(RedisTemplate<String, InvitationInformation> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * 초대링크 정보를 저장합니다. 저장 시 객체의 TTL값에 따라 만료가 설정됩니다.
     *
     * @param invitationInformation
     */
    public void save(InvitationInformation invitationInformation) {
        String key = makeKey(invitationInformation.getId());
        redisTemplate.opsForValue()
                .set(key, invitationInformation, invitationInformation.getTimeToLive(),
                        TimeUnit.SECONDS);
    }

    /**
     * uuid를 이용해 해당 초대링크 정보를 찾아서 반환합니다.
     *
     * @param uuid
     * @return
     */
    public Optional<InvitationInformation> findById(String uuid) {
        String key = makeKey(uuid);
        InvitationInformation invitationInformation = redisTemplate.opsForValue()
                .get(key);
        return Optional.ofNullable(invitationInformation);
    }

    /**
     * uuid를 이용해 해당 초대링크 정보를 삭제합니다.
     *
     * @param uuid
     */
    public void delete(String uuid) {
        String key = makeKey(uuid);
        redisTemplate.delete(key);
    }

    /**
     * uuid 값과 키스페이스 값을 합쳐 key를 생성합니다.
     * @param uuid
     * @return
     */
    private String makeKey(String uuid) {
        return "invitation:" + uuid;
    }
}
