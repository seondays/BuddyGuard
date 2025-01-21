package buddyguard.mybuddyguard.invitation.repository.dto;

public record StoredInvitationInformation(Long petId,
                                          Long userId,
                                          String expiration) {
}
