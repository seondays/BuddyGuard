package buddyguard.mybuddyguard.weight.dto;

import java.time.LocalDateTime;

public record WeightUpdateRequest(
        LocalDateTime recordedAt,
        Double weight,
        String memo
) {

}
