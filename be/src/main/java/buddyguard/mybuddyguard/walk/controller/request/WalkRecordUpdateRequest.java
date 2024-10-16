package buddyguard.mybuddyguard.walk.controller.request;

//import buddyguard.mybuddyguard.s3.entity.S3Images;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record WalkRecordUpdateRequest(
        @NotNull
        List<String> buddyIds,       // 추가된 반려동물들의 ID 배열 (문자열)
        @NotNull
        LocalDate startDate,   // 산책 시작 날짜
        @NotNull
        LocalDate endDate,     // 산책 종료 날짜
        @NotNull
        String startTime,   // 산책 시작 시간
        @NotNull
        String endTime,     // 산책 종료 시간
        @NotNull
        String totalTime,      // 총 산책 시간 (00:00:46 형식의 문자열)
        @NotNull
        String note,           // 산책에 대한 메모
        @NotNull
        List<String> centerPosition, // 중심 위치 (위도, 경도)
        @NotNull
        Integer mapLevel,      // 지도 레벨
        @NotNull
        List<Map<String, Double>>  path,           // 산책 경로 (위도, 경도 배열)
        @NotNull
        String pathImage,
        @NotNull
        Double distance
) {}
