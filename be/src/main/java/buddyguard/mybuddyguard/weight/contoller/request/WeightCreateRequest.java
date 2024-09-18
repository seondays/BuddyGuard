package buddyguard.mybuddyguard.weight.contoller.request;

import java.time.LocalDateTime;

public record WeightCreateRequest(
        Long petId,
        LocalDateTime recordedAt,
        Double weight,
        String description
) {

}
