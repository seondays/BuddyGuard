package buddyguard.mybuddyguard.walk.mapper;

import buddyguard.mybuddyguard.pet.entity.Pet;
import buddyguard.mybuddyguard.walk.controller.request.WalkRecordCreateRequest;
import buddyguard.mybuddyguard.walk.controller.request.WalkRecordCreateRequest.WalkRecordPathRequest;
import buddyguard.mybuddyguard.walk.controller.response.WalkRecordDetailResponse;
import buddyguard.mybuddyguard.walk.controller.response.WalkRecordResponse;
import buddyguard.mybuddyguard.walk.entity.PetWalkRecord;
import buddyguard.mybuddyguard.walk.entity.WalkRecord;
import buddyguard.mybuddyguard.walkimage.entity.WalkS3Image;

public class WalkRecordMapper {

    // WalkRecordCreateRequest WalkRecord 엔티티로 변환하는 메서드
    public static WalkRecord toEntity(WalkRecordCreateRequest request) {
        return WalkRecord.builder()
                .petWalkRecords(request.buddyIds().stream()
                        .map(id -> PetWalkRecord.builder()
                                .pet(Pet.builder()
                                        .id(id)
                                        .build())
                                .build())
                        .toList())    // 선택한 반려동물들의 ID 배열
                .startDate(request.startDate())  // 산책 시작 날짜
                .endDate(request.endDate())      // 산책 종료 날짜
                .startTime(request.startTime())  // 산책 시작 시간
                .endTime(request.endTime())      // 산책 종료 시간
                .totalTime(request.totalTime())  // 총 산책 시간
                .note(request.note())            // 산책에 대한 메모
                .centerPosition(request.centerPosition().toWalkRecordCenterPosition())  // 중심 위치
                .mapLevel(request.mapLevel())    // 지도 레벨
                .path(request.path().stream()
                        .map(WalkRecordPathRequest::toWalkRecordPath)
                        .toList()
                )            // 산책 경로
                .distance(request.distance())    // 총 거리
                .build();
    }



    // WalkRecord 엔티티를 WalkRecordResponse 변환하는 메서드
    public static WalkRecordResponse toResponse(WalkRecord walkRecord) {
        return WalkRecordResponse.builder()
                .id(walkRecord.getId())  // 산책 기록 ID
                .buddyIds(walkRecord.getPetWalkRecords().stream()
                        .map(PetWalkRecord::getPetId)
                        .toList())
                .startDate(walkRecord.getStartDate())  // 산책 시작 날짜
                .endDate(walkRecord.getEndDate())      // 산책 종료 날짜
                .startTime(walkRecord.getStartTime())  // 산책 시작 시간
                .endTime(walkRecord.getEndTime())      // 산책 종료 시간
                .totalTime(walkRecord.getTotalTime())  // 총 산책 시간
                .note(walkRecord.getNote())            // 산책에 대한 메모
                .centerPosition(WalkRecordResponse.WalkRecordPosition.fromWalkRecordCenterPosition(walkRecord.getCenterPosition()))  // 중심 위치
                .mapLevel(walkRecord.getMapLevel())    // 지도 레벨
                .path(walkRecord.getPath().stream()
                        .map(WalkRecordResponse.WalkRecordPosition::fromWalkRecordPath)
                        .toList()
                )            // 산책 경로
                .distance(walkRecord.getDistance())    // 총 거리
                .fileUrl(walkRecord.getPathImage().getImageUrl()) // 이미지 URL 설정
                .build();
    }

    // WalkRecordDetailResponse 변환하는 메서드 (통계 정보)
    public static WalkRecordDetailResponse toDetailResponse(int count, Double averageDistance,
            String averageTime) {
        return WalkRecordDetailResponse.builder()
                .count(count)                 // 기록의 총 개수
                .averageDistance(averageDistance)  // 평균 거리
                .averageTime(averageTime)     // 평균 산책 시간
                .build();
    }

}
