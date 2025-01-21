package buddyguard.mybuddyguard.invitation.mapper;

import buddyguard.mybuddyguard.invitation.entity.InvitationInformation;
import buddyguard.mybuddyguard.invitation.repository.dto.StoredInvitationInformation;
import java.time.Instant;
import java.util.Date;

public class InvitationMapper {

    public static StoredInvitationInformation toStoredInvitationInformation(
            InvitationInformation invitationInformation) {
        String expiration = String.valueOf(
                Date.from(Instant.now().plusSeconds(invitationInformation.getTimeToLive())));

        return new StoredInvitationInformation(invitationInformation.getPetId(),
                invitationInformation.getUserId(), expiration);
    }
}
