package buddyguard.mybuddyguard.weight.dto;

import java.time.LocalDateTime;

public record WeightCreateRequest(
        Integer petId,
        LocalDateTime recordedAt,
        Double weight
) {

}
