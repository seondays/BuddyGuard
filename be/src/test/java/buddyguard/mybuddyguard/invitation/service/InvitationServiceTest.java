package buddyguard.mybuddyguard.invitation.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

import buddyguard.mybuddyguard.exception.PetNotFoundException;
import buddyguard.mybuddyguard.exception.RecordNotFoundException;
import buddyguard.mybuddyguard.exception.UserInformationNotFoundException;
import buddyguard.mybuddyguard.invitation.controller.response.InvitationLinkResponse;
import buddyguard.mybuddyguard.invitation.entity.InvitationInformation;
import buddyguard.mybuddyguard.invitation.exception.InvalidInvitationException;
import buddyguard.mybuddyguard.invitation.repository.InvitationRepository;
import buddyguard.mybuddyguard.login.entity.Users;
import buddyguard.mybuddyguard.login.repository.UserRepository;
import buddyguard.mybuddyguard.pet.entity.Pet;
import buddyguard.mybuddyguard.pet.repository.PetRepository;
import buddyguard.mybuddyguard.pet.repository.UserPetRepository;
import buddyguard.mybuddyguard.pet.utils.UserPetRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.redis.DataRedisTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@DataRedisTest
@ExtendWith(SpringExtension.class)
public class InvitationServiceTest {

    private InvitationService invitationService;

    @Mock
    private UserRepository userRepository;

    @Autowired
    private InvitationRepository invitationRepository;

    @Mock
    private PetRepository petRepository;

    @Mock
    private UserPetRepository userPetRepository;

    @BeforeEach
    public void setup() {
        // 직접 객체를 주입하여 service 생성
        MockitoAnnotations.openMocks(this);
        invitationService = new InvitationService(userRepository, petRepository, userPetRepository,
                invitationRepository);
    }

    @Test
    void 정상적으로_링크_생성() {
        // GIVEN
        Users user = new Users();
        user.setId(1L);
        user.setName("tester");

        Pet pet = Pet.builder().id(1L).build();

        when(userRepository.existsById(user.getId())).thenReturn(true);
        when(userPetRepository.existsByUserIdAndPetIdAndRole(user.getId(), pet.getId(),
                UserPetRole.HOST)).thenReturn(true);
        when(petRepository.existsById(pet.getId())).thenReturn(true);
        when(userPetRepository.existsByUserIdAndPetId(user.getId(), pet.getId())).thenReturn(true);

        // WHEN
        InvitationLinkResponse invitationLink = invitationService.makeInvitationLink(user.getId(),
                pet.getId());

        String[] linkParts = invitationLink.invitationlink().split("/");
        String uuid = linkParts[linkParts.length - 1];

        // THEN
        assertThat(invitationLink).isNotNull();
        InvitationInformation savedInvitation = invitationRepository.findById(uuid).orElseThrow();

        assertThat(savedInvitation.getUserId()).isEqualTo(user.getId());
        assertThat(savedInvitation.getPetId()).isEqualTo(pet.getId());
    }

    @Test
    void 링크_생성_시_펫이_없는_경우_예외_발생() {
        // GIVEN
        Users user = new Users();
        user.setId(1L);
        user.setName("tester");

        Pet pet = Pet.builder().id(1L).build();

        when(userRepository.existsById(user.getId())).thenReturn(true);
        when(userPetRepository.existsByUserIdAndPetIdAndRole(user.getId(), pet.getId(),
                UserPetRole.HOST)).thenReturn(true);
        when(petRepository.existsById(pet.getId())).thenThrow(PetNotFoundException.class);
        when(userPetRepository.existsByUserIdAndPetId(user.getId(), pet.getId())).thenReturn(false);

        // WHEN, THEN
        assertThatThrownBy(() -> invitationService.makeInvitationLink(user.getId(), pet.getId()))
                .isInstanceOf(PetNotFoundException.class);
    }

    @Test
    void 링크_생성_시_유저가_없는_경우_예외_발생() {
        // GIVEN
        Users user = new Users();
        user.setId(1L);
        user.setName("tester");

        Pet pet = Pet.builder().id(1L).build();

        when(userRepository.existsById(user.getId())).thenThrow(UserInformationNotFoundException.class);
        when(userPetRepository.existsByUserIdAndPetIdAndRole(user.getId(), pet.getId(),
                UserPetRole.HOST)).thenReturn(true);
        when(petRepository.existsById(pet.getId())).thenReturn(true);
        when(userPetRepository.existsByUserIdAndPetId(user.getId(), pet.getId())).thenReturn(false);

        // WHEN, THEN
        assertThatThrownBy(() -> invitationService.makeInvitationLink(user.getId(), pet.getId()))
                .isInstanceOf(UserInformationNotFoundException.class);
    }

    @Test
    void 링크_생성_시_펫_유저_관계가_없는_경우_예외_발생() {
        // GIVEN
        Users user = new Users();
        user.setId(1L);
        user.setName("tester");

        Pet pet = Pet.builder().id(1L).build();

        when(userRepository.existsById(user.getId())).thenReturn(true);
        when(userPetRepository.existsByUserIdAndPetIdAndRole(user.getId(), pet.getId(),
                UserPetRole.HOST)).thenReturn(true);
        when(petRepository.existsById(pet.getId())).thenReturn(true);
        when(userPetRepository.existsByUserIdAndPetId(user.getId(), pet.getId())).thenReturn(false);

        // WHEN, THEN
        assertThatThrownBy(() -> invitationService.makeInvitationLink(user.getId(), pet.getId()))
                .isInstanceOf(RecordNotFoundException.class);
    }

    @Test
    void 링크_생성_시_호스트가_아닌_경우_예외_발생() {
        // GIVEN
        Users user = new Users();
        user.setId(1L);
        user.setName("tester");

        Pet pet = Pet.builder().id(1L).build();

        when(userRepository.existsById(user.getId())).thenReturn(true);
        when(userPetRepository.existsByUserIdAndPetIdAndRole(user.getId(), pet.getId(),
                UserPetRole.HOST)).thenReturn(false);
        when(petRepository.existsById(pet.getId())).thenReturn(true);
        when(userPetRepository.existsByUserIdAndPetId(user.getId(), pet.getId())).thenReturn(false);

        // WHEN, THEN
        assertThatThrownBy(() -> invitationService.makeInvitationLink(user.getId(), pet.getId()))
                .isInstanceOf(InvalidInvitationException.class);
    }
}
