package buddyguard.mybuddyguard.walk.controller.request;

import buddyguard.mybuddyguard.walk.entity.PetWalkRecord;
import buddyguard.mybuddyguard.walk.entity.WalkRecord;
import buddyguard.mybuddyguard.walk.entity.WalkRecordCenterPosition;
import buddyguard.mybuddyguard.walk.entity.WalkRecordPath;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public record WalkRecordUpdateRequest(
        @NotNull
        List<Long> buddysId,       // 추가된 반려동물들의 ID 배열 (문자열)

        @JsonFormat(pattern = "yyyy년 MM월 dd일")
        @NotNull
        LocalDate startDate,   // 산책 시작 날짜

        @JsonFormat(pattern = "yyyy년 MM월 dd일")
        @NotNull
        LocalDate endDate,     // 산책 종료 날짜

        @NotBlank
        String startTime,   // 산책 시작 시간
        @NotBlank
        String endTime,     // 산책 종료 시간
        @NotBlank
        String totalTime,      // 총 산책 시간 (00:00:46 형식의 문자열)
        @NotBlank
        String note,           // 산책에 대한 메모
        @NotNull
        WalkRecordPathRequest centerPosition, // 중심 위치 (위도, 경도)
        @NotNull
        Integer mapLevel,      // 지도 레벨
        @NotNull
        List<WalkRecordPathRequest>  path,           // 산책 경로 (위도, 경도 배열)
        @NotNull
        Double distance
) {
        public WalkRecord toWalkRecord(Long recordId) {
                return WalkRecord.builder()
                        .id(recordId)
                        .petWalkRecords(this.buddysId().stream()
                                .map(id -> PetWalkRecord.builder()
                                        .id(id)
                                        .build())
                                .toList())    // 선택한 반려동물들의 ID 배열
                        .startDate(this.startDate())  // 산책 시작 날짜
                        .endDate(this.endDate())      // 산책 종료 날짜
                        .startTime(this.startTime())  // 산책 시작 시간
                        .endTime(this.endTime())      // 산책 종료 시간
                        .totalTime(this.totalTime())  // 총 산책 시간
                        .note(this.note())            // 산책에 대한 메모
                        .centerPosition(this.centerPosition().toWalkRecordCenterPosition())  // 중심 위치
                        .mapLevel(this.mapLevel())    // 지도 레벨
                        .path(this.path().stream()    //산책 경로
                                .map(WalkRecordPathRequest::toWalkRecordPath)
                                .toList()
                        )
                        .distance(this.distance())    // 총 거리
                        .build();
        }

        @Getter
        @AllArgsConstructor
        @NoArgsConstructor(force = true)
        @Builder
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
