package buddyguard.mybuddyguard.weight.contoller.request;

import java.time.LocalDateTime;

public record WeightCreateRequest(
        Integer petId,
        LocalDateTime recordedAt,
        Double weight,
        String memo
) {

}
