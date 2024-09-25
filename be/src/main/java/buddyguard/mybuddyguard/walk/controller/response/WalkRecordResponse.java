package buddyguard.mybuddyguard.walk.controller.response;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Builder;

@Builder
public record WalkRecordResponse(
        Long id,
        Long petId,
        LocalTime startTime,
        LocalTime endTime,
        LocalTime duration,
        LocalDate createdAt,
        Double distance,
        String description,
        String imageUrl  // S3 이미지 URL
) {}
