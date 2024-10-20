package buddyguard.mybuddyguard.walk.controller.request;

import buddyguard.mybuddyguard.walk.entity.WalkRecord;
import buddyguard.mybuddyguard.walk.entity.WalkRecordCenterPosition;
import buddyguard.mybuddyguard.walk.entity.WalkRecordPath;
import buddyguard.mybuddyguard.walkimage.entity.WalkS3Image;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public record WalkRecordCreateRequest(

        @NotNull
        List<Long> buddysId,      // 선택한 반려동물들의 ID 배열
        @NotNull
        LocalDate startDate,  // 산책 시작 날짜
        @NotNull
        LocalDate endDate,    // 산책 종료 날짜
        @NotBlank
        String startTime,  // 산책 시작 시간
        @NotBlank
        String endTime,    // 산책 종료 시간
        @NotBlank
        String totalTime,     // 총 산책 시간 (00:00:46 형식의 문자열)

        String note,          // 산책에 대한 메모
        @NotNull
        WalkRecordPathRequest centerPosition, // 중심 위치 (위도, 경도)
        @NotNull
        Integer mapLevel,     // 지도 레벨
        @NotNull
        List<WalkRecordPathRequest> path,    // 산책 경로 (위도, 경도 배열)
        @NotNull
        Double distance     // 총 거리 (km 단위)

) {
    public WalkRecord toWalkRecord(Long recordId, WalkS3Image walkS3Image) {
        return WalkRecord.builder()
                .id(recordId)
                .startDate(this.startDate())  // 산책 시작 날짜
                .endDate(this.endDate())      // 산책 종료 날짜
                .startTime(this.startTime())  // 산책 시작 시간
                .endTime(this.endTime())      // 산책 종료 시간
                .totalTime(this.totalTime())  // 총 산책 시간
                .note(this.note())            // 산책에 대한 메모
                .centerPosition(this.centerPosition().toWalkRecordCenterPosition())  // 중심 위치
                .mapLevel(this.mapLevel())    // 지도 레벨
                .distance(this.distance())    // 총 거리
                .path(this.path().stream()    // 산책 경로
                        .map(WalkRecordPathRequest::toWalkRecordPath)
                        .toList()
                )
                .pathImage(walkS3Image)       // S3 이미지 설정
                .petWalkRecords(new ArrayList<>()) // 빈 리스트로 초기화
                .build();
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(force = true)
    public static class WalkRecordPathRequest {

        @NotNull
        private final Double latitude;  // 위도
        @NotNull
        private final Double longitude; // 경도

        public WalkRecordPath toWalkRecordPath() {
            return WalkRecordPath.builder()
                    .latitude(this.latitude)
                    .longitude(this.longitude)
                    .build();
        }

        public WalkRecordCenterPosition toWalkRecordCenterPosition() {
            return WalkRecordCenterPosition.builder()
                    .latitude(this.latitude)
                    .longitude(this.longitude)
                    .build();
        }



    }
}
