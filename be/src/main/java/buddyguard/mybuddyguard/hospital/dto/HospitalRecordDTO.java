package buddyguard.mybuddyguard.hospital.dto;

import java.time.LocalDateTime;

public record HospitalRecordDTO(
        Long id,
        Long userId,
        Long petId,
        LocalDateTime visitDate,
        String hospitalName,
        String description

) {

}
