package buddyguard.mybuddyguard.weight.dto;

import java.time.LocalDateTime;

public record WeightResponse(
        Long id,
        Long petId,
        Double weight,
        LocalDateTime recordedAt,
        String memo
) {

}
