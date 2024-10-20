package buddyguard.mybuddyguard.pet.mapper;

import buddyguard.mybuddyguard.pet.contoller.request.PetRegisterRequest;
import buddyguard.mybuddyguard.pet.entity.Pet;
import java.util.Optional;

public class PetMapper {

    public static Pet toEntity(PetRegisterRequest petRegisterRequest) {
        return Pet.builder()
                .name(petRegisterRequest.name())
                .profileImage(Optional.ofNullable(petRegisterRequest.profileImage()).orElse("None"))
                .type(petRegisterRequest.type())
                .birth(petRegisterRequest.birth())
                .build();
    }
}
