package buddyguard.mybuddyguard.hospital.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record HospitalRecordUpdateRequest(

        @NotNull
        LocalDateTime visitDate,
        @NotBlank
        String hospitalName,
        @NotBlank
        String description
) {

}
