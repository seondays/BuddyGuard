package buddyguard.mybuddyguard.walk.controller.request;

import java.time.LocalDate;
import java.time.LocalTime;
import buddyguard.mybuddyguard.s3.entity.S3Images;

public record WalkRecordCreateRequest(
        Long petId,
        LocalTime startTime,
        LocalTime endTime,
        LocalTime duration,
        LocalDate createdAt,
        Double distance,
        String description,
        S3Images image
) {}
