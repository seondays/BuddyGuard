package buddyguard.mybuddyguard.pet.contoller.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;

public record PetUpdateInformationRequest(
        String name,
        @JsonProperty("profile_image") String profileImage,
        LocalDate birth
) {

}
