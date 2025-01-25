package buddyguard.mybuddyguard.invitation.repository;

import buddyguard.mybuddyguard.invitation.entity.InvitationInformation;
import buddyguard.mybuddyguard.invitation.mapper.InvitationMapper;
import buddyguard.mybuddyguard.invitation.repository.dto.StoredInvitationInformation;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class InvitationRepository {

    private final RedisTemplate<String, StoredInvitationInformation> redisTemplate;

    public InvitationRepository(RedisTemplate<String, StoredInvitationInformation> redisTemplate) {
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
                .set(key, InvitationMapper.toStoredInvitationInformation(invitationInformation),
                        invitationInformation.getTimeToLive(),
                        TimeUnit.SECONDS);
    }

    /**
     * uuid를 이용해 해당 초대링크 정보를 찾아서 반환합니다.
     *
     * @param uuid
     * @return
     */
    public Optional<StoredInvitationInformation> findById(String uuid) {
        String key = makeKey(uuid);
        StoredInvitationInformation storedInvitationInformation = redisTemplate.opsForValue()
                .get(key);
        return Optional.ofNullable(storedInvitationInformation);
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
     * 초대링크 정보를 조회 후 바로 삭제합니다.
     *
     * @param uuid
     * @return
     */
    public Optional<StoredInvitationInformation> getAndDelete(String uuid) {
        String key = makeKey(uuid);
        return Optional.ofNullable(redisTemplate.opsForValue().getAndDelete(key));
    }

    /**
     * uuid 값과 키스페이스 값을 합쳐 key를 생성합니다.
     *
     * @param uuid
     * @return
     */
    private String makeKey(String uuid) {
        return "invitation:" + uuid;
    }
}
