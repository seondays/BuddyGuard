package buddyguard.mybuddyguard.pet.mapper;

import buddyguard.mybuddyguard.login.entity.Users;
import buddyguard.mybuddyguard.pet.contoller.response.PetWithUserListResponse;
import buddyguard.mybuddyguard.pet.entity.Pet;

public class UserPetMapper {

    public static PetWithUserListResponse toResponse(Users user, Pet pet) {
        return new PetWithUserListResponse(user.getId(), pet.getId(), pet.getName(),
                pet.getProfileImage());
    }
}
