package buddyguard.mybuddyguard.invitation.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class InvitationInformation {
    @Id
    private String id;
    private Long petId;
    private Long userId;
    private Long timeToLive;

    public static InvitationInformation create(String uuid, Long petId, Long userId) {
        return InvitationInformation.builder()
                .id(uuid)
                .petId(petId)
                .userId(userId)
                .timeToLive(3600L)
                .build();
    }
}
