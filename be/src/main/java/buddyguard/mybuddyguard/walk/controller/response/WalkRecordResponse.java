package buddyguard.mybuddyguard.walk.controller.response;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Builder;

@Builder
public record WalkRecordResponse(
        Long id,
        LocalDate startDate,   // 산책 시작 날짜
        LocalDate endDate,     // 산책 종료 날짜
        LocalTime startTime,   // 산책 시작 시간
        LocalTime endTime,     // 산책 종료 시간
        String totalTime,      // 총 산책 시간 (00:00:46 형식의 문자열)
        String note,           // 산책에 대한 메모
        String centerPosition, // 중심 위치 (위도, 경도)
        Integer mapLevel,      // 지도 레벨
        String path,           // 산책 경로 (위도, 경도 배열)
        Double distance,       // 총 거리
        String pathImage        // S3 이미지 URL
) {}
