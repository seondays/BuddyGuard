package buddyguard.mybuddyguard.walk.mapper;

import buddyguard.mybuddyguard.s3.entity.S3Images;
import buddyguard.mybuddyguard.walk.controller.request.WalkRecordCreateRequest;
import buddyguard.mybuddyguard.walk.controller.response.WalkRecordResponse;
import buddyguard.mybuddyguard.walk.entity.WalkRecord;
import java.util.List;
import java.util.stream.Collectors;

public class WalkRecordMapper {

    // WalkRecordCreateRequest WalkRecord 엔티티로 변환하는 메서드
    public static WalkRecord toEntity(WalkRecordCreateRequest request, S3Images pathImage) {
        return WalkRecord.builder()
                .buddyIds(request.buddyIds())    // 선택한 반려동물들의 ID 배열
                .startDate(request.startDate())  // 산책 시작 날짜
                .endDate(request.endDate())      // 산책 종료 날짜
                .startTime(request.startTime())  // 산책 시작 시간
                .endTime(request.endTime())      // 산책 종료 시간
                .totalTime(request.totalTime())  // 총 산책 시간
                .note(request.note())            // 산책에 대한 메모
                .centerPosition(request.centerPosition())  // 중심 위치
                .mapLevel(request.mapLevel())    // 지도 레벨
                .path(request.path())            // 산책 경로
                .pathImage(pathImage)            // 경로 이미지 파일 (S3Images 객체)
                .distance(request.distance())    // 총 거리
                .build();
    }

    // WalkRecord 엔티티를 WalkRecordResponse 변환하는 메서드
    public static WalkRecordResponse toResponse(WalkRecord walkRecord) {
        return WalkRecordResponse.builder()
                .id(walkRecord.getId())  // 산책 기록 ID
                .petId(walkRecord.getBuddyIds())    // 선택한 반려동물들의 ID 배열
                .startDate(walkRecord.getStartDate())  // 산책 시작 날짜
                .endDate(walkRecord.getEndDate())      // 산책 종료 날짜
                .startTime(walkRecord.getStartTime())  // 산책 시작 시간
                .endTime(walkRecord.getEndTime())      // 산책 종료 시간
                .totalTime(walkRecord.getTotalTime())  // 총 산책 시간
                .note(walkRecord.getNote())            // 산책에 대한 메모
                .centerPosition(walkRecord.getCenterPosition())  // 중심 위치
                .mapLevel(walkRecord.getMapLevel())    // 지도 레벨
                .path(walkRecord.getPath())            // 산책 경로
                .distance(walkRecord.getDistance())    // 총 거리
                .pathImage(walkRecord.getPathImage().getImageUrl())  // 경로 이미지 URL
                .build();
    }

    // WalkRecord 리스트를 WalkRecordResponse 리스트로 변환하는 메서드
    public static List<WalkRecordResponse> toResponseList(List<WalkRecord> walkRecords) {
        return walkRecords.stream()
                .map(WalkRecordMapper::toResponse)
                .collect(Collectors.toList());
    }
}
