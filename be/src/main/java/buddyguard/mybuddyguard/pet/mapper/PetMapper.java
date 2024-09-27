package buddyguard.mybuddyguard.pet.mapper;

import buddyguard.mybuddyguard.pet.contoller.request.PetRegisterRequest;
import buddyguard.mybuddyguard.pet.entity.Pet;

public class PetMapper {

    public static Pet toEntity(PetRegisterRequest petRegisterRequest) {
        return Pet.builder()
                .name(petRegisterRequest.name())
                .profileImage(petRegisterRequest.profileImage())
                .type(petRegisterRequest.type())
                .birth(petRegisterRequest.birth())
                .build();
    }
}
