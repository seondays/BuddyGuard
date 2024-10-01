package buddyguard.mybuddyguard.invitation.service;

import buddyguard.mybuddyguard.exception.PetNotFoundException;
import buddyguard.mybuddyguard.exception.RecordNotFoundException;
import buddyguard.mybuddyguard.exception.UserInformationNotFoundException;
import buddyguard.mybuddyguard.invitation.exception.InvalidInvitationException;
import buddyguard.mybuddyguard.invitation.controller.response.InvitationLinkResponse;
import buddyguard.mybuddyguard.invitation.entity.InvitationInformation;
import buddyguard.mybuddyguard.invitation.repository.InvitationRepository;
import buddyguard.mybuddyguard.invitation.utils.InvitationLineGenerator;
import buddyguard.mybuddyguard.login.repository.UserRepository;
import buddyguard.mybuddyguard.pet.repository.PetRepository;
import buddyguard.mybuddyguard.pet.repository.UserPetRepository;
import buddyguard.mybuddyguard.pet.utils.UserPetRole;
import org.springframework.stereotype.Service;

@Service
public class InvitationService {

    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final UserPetRepository userPetRepository;
    private final InvitationRepository invitationRepository;

    public InvitationService(UserRepository userRepository, PetRepository petRepository,
            UserPetRepository userPetRepository, InvitationRepository invitationRepository) {
        this.userRepository = userRepository;
        this.petRepository = petRepository;
        this.userPetRepository = userPetRepository;
        this.invitationRepository = invitationRepository;
    }

    public InvitationLinkResponse makeInvitationLink(Long userId, Long petId) {
        validateInvitation(userId, petId);

        String uuid = InvitationLineGenerator.generateUuid().toString();

        InvitationInformation invitationInformation = InvitationInformation.builder().id(uuid)
                .userId(userId).petId(petId).build();

        invitationRepository.save(invitationInformation);

        String link = InvitationLineGenerator.generateLink(uuid);
        return new InvitationLinkResponse(link);
    }

    private void validateInvitation(Long userId, Long petId) {
        if (!userRepository.existsById(userId)) {
            throw new UserInformationNotFoundException();
        }
        if (!userPetRepository.existsByUserIdAndPetIdAndRole(userId, petId, UserPetRole.HOST)) {
            throw new InvalidInvitationException();
        }
        if (!petRepository.existsById(petId)) {
            throw new PetNotFoundException();
        }
        if (!userPetRepository.existsByUserIdAndPetId(userId, petId)) {
            throw new RecordNotFoundException();
        }
    }
}
