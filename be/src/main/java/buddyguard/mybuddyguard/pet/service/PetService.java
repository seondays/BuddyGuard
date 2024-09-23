package buddyguard.mybuddyguard.pet.service;

import buddyguard.mybuddyguard.login.repository.UserRepository;
import buddyguard.mybuddyguard.pet.contoller.request.PetRegisterRequest;
import buddyguard.mybuddyguard.pet.entity.Pet;
import buddyguard.mybuddyguard.pet.entity.UserPet;
import buddyguard.mybuddyguard.pet.mapper.PetMapper;
import buddyguard.mybuddyguard.pet.repository.PetRepository;
import buddyguard.mybuddyguard.pet.repository.UserPetRepository;
import buddyguard.mybuddyguard.pet.utils.UserPetRole;
import java.util.NoSuchElementException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class PetService {

    private final PetRepository repository;
    private final UserPetRepository userPetRepository;
    private final UserRepository userRepository;

    public PetService(PetRepository repository, UserPetRepository userPetRepository,
            UserRepository userRepository) {
        this.repository = repository;
        this.userPetRepository = userPetRepository;
        this.userRepository = userRepository;
    }

    /**
     * 펫을 등록한다.
     * @param petRegisterRequest
     */
    @Transactional
    public void register(PetRegisterRequest petRegisterRequest) {
        Long userId = petRegisterRequest.userId();
        if (!validateUser(userId)) {
            throw new NoSuchElementException();
        }

        Pet toPet = PetMapper.toEntity(petRegisterRequest);
        Pet pet = repository.save(toPet);

        // todo : 유저가 게스트인지 호스트인지에 따라 값이 달라져야 함
        UserPet userPet = UserPet.builder()
                .userId(userId)
                .petId(pet.getId())
                .role(UserPetRole.GUEST).build();
        userPetRepository.save(userPet);

        log.info("REGISTER PET : {}번 {} 등록", pet.getId(), pet.getName());
        log.info("REGISTER USER_PET : 유저 {}에게 {}번 펫 등록", userId, pet.getId());
    }

    /**
     * 유저에게 펫 등록이 가능한지 검증한다.
     * @param userId
     * @return
     */
    private boolean validateUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            return false;
        }
        if (userPetRepository.existsByUserExceedPetCount(userId)) {
            return false;
        }
        return true;
    }
}
