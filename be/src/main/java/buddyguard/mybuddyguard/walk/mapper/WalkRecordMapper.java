package buddyguard.mybuddyguard.walk.mapper;

import buddyguard.mybuddyguard.walk.controller.request.WalkRecordCreateRequest;
import buddyguard.mybuddyguard.walk.controller.response.WalkRecordResponse;
import buddyguard.mybuddyguard.walk.entity.WalkRecord;

public class WalkRecordMapper {

    public static WalkRecord toEntity(WalkRecordCreateRequest request) {
        return WalkRecord.builder()
                .petId(request.petId())
                .startTime(request.startTime())
                .endTime(request.endTime())
                .duration(request.duration())
                .createdAt(request.createdAt())
                .distance(request.distance())
                .description(request.description())
                .image(request.image())  // S3Image 연결
                .build();
    }

    public static WalkRecordResponse toResponse(WalkRecord walkRecord) {
        return WalkRecordResponse.builder()
                .id(walkRecord.getId())
                .petId(walkRecord.getPetId())
                .startTime(walkRecord.getStartTime())
                .endTime(walkRecord.getEndTime())
                .duration(walkRecord.getDuration())
                .createdAt(walkRecord.getCreatedAt())
                .distance(walkRecord.getDistance())
                .description(walkRecord.getDescription())
                .imageUrl(walkRecord.getImage().getImageUrl())
                .build();
    }
}
