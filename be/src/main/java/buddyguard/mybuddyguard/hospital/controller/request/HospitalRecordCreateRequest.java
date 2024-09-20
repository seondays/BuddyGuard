package buddyguard.mybuddyguard.hospital.controller.request;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public record HospitalRecordCreateRequest(

        @NotBlank
        Long userId,
        @NotBlank
        Long petId,
        @NotBlank
        LocalDateTime visitDate,
        @NotBlank
        String hospitalName,
        @NotBlank
        String description
) {

}
