package buddyguard.mybuddyguard.pet.contoller.request;

import buddyguard.mybuddyguard.pet.utils.PetType;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record PetRegisterRequest(
        @NotNull String name,
        @JsonProperty("profile_image") String profileImage,
        @NotNull PetType type,
        @NotNull LocalDate birth
) {

}