package buddyguard.mybuddyguard.invitation.controller;

import buddyguard.mybuddyguard.invitation.controller.response.InvitationLinkResponse;
import buddyguard.mybuddyguard.invitation.service.InvitationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InvitationController {

    private final InvitationService invitationService;

    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping("/invitation/{userId}/{petId}")
    public ResponseEntity<InvitationLinkResponse> makeInvitationLink(
            @PathVariable("userId") Long userId, @PathVariable("petId") Long petId) {
        InvitationLinkResponse response = invitationService.makeInvitationLink(userId, petId);
        return ResponseEntity.ok(response);
    }
}
