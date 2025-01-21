package buddyguard.mybuddyguard.invitation.service;

import buddyguard.mybuddyguard.exception.AlreadyInGroupException;
import buddyguard.mybuddyguard.exception.PetNotFoundException;
import buddyguard.mybuddyguard.exception.RecordNotFoundException;
import buddyguard.mybuddyguard.exception.UserInformationNotFoundException;
import buddyguard.mybuddyguard.invitation.exception.InvalidInvitationException;
import buddyguard.mybuddyguard.invitation.controller.response.InvitationLinkResponse;
import buddyguard.mybuddyguard.invitation.entity.InvitationInformation;
import buddyguard.mybuddyguard.invitation.exception.InvitationLinkExpiredException;
import buddyguard.mybuddyguard.invitation.exception.UserPetGroupNotFound;
import buddyguard.mybuddyguard.invitation.repository.InvitationRepository;
import buddyguard.mybuddyguard.invitation.utils.InvitationLinkGenerator;
import buddyguard.mybuddyguard.login.entity.Users;
import buddyguard.mybuddyguard.login.repository.UserRepository;
import buddyguard.mybuddyguard.pet.entity.Pet;
import buddyguard.mybuddyguard.pet.entity.UserPet;
import buddyguard.mybuddyguard.pet.exception.InvalidPetRegisterException;
import buddyguard.mybuddyguard.pet.repository.PetRepository;
import buddyguard.mybuddyguard.pet.repository.UserPetRepository;
import buddyguard.mybuddyguard.pet.utils.UserPetRole;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        String uuid = InvitationLinkGenerator.generateUuid().toString();

        InvitationInformation invitationInformation = InvitationInformation.create(uuid, petId,
                userId);

        invitationRepository.save(invitationInformation);

        String link = InvitationLinkGenerator.generateLink(uuid);
        return new InvitationLinkResponse(link);
    }

    @Transactional
    public void register(String uuid, Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(UserInformationNotFoundException::new);

        StoredInvitationInformation invitation = invitationRepository.findById(uuid).orElseThrow(
                InvitationLinkExpiredException::new);

        Pet pet = petRepository.findById(invitation.petId())
                .orElseThrow(PetNotFoundException::new);

        validateRegister(user.getId(), pet.getId());

        UserPet userPet = UserPet.builder()
                .user(user)
                .pet(pet)
                .role(UserPetRole.GUEST).build();
        userPetRepository.save(userPet);
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

    private void validateRegister(Long userId, Long petId) {
        if (userPetRepository.existsByUserExceedPetCount(userId)) {
            throw new InvalidPetRegisterException();
        }
        if (!userPetRepository.existsByPetIdAndRole(petId, UserPetRole.HOST)) {
            throw new UserPetGroupNotFound();
        }
        if (userPetRepository.findByUserIdAndPetId(userId, petId).isPresent()) {
            throw new AlreadyInGroupException();
        }
    }
}
