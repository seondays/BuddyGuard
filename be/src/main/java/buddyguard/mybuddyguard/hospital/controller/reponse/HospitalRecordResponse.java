package buddyguard.mybuddyguard.hospital.controller.reponse;

import java.time.LocalDateTime;

public record HospitalRecordResponse(
        Long id,
        Long userId,
        Long petId,
        LocalDateTime date,
        String title,
        String description

) {

}

