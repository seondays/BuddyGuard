package buddyguard.mybuddyguard.weight.contoller.request;

import java.time.LocalDateTime;

public record WeightUpdateRequest(
        LocalDateTime recordedAt,
        Double weight,
        String memo
) {

}
