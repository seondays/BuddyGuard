package buddyguard.mybuddyguard.walk.controller.request;

import buddyguard.mybuddyguard.s3.entity.S3Images;
import java.time.LocalDate;
import java.time.LocalTime;

public record WalkRecordUpdateRequest(
        String buddyIds,       // 추가된 반려동물들의 ID 배열 (문자열)
        LocalDate startDate,   // 산책 시작 날짜
        LocalDate endDate,     // 산책 종료 날짜
        LocalTime startTime,   // 산책 시작 시간
        LocalTime endTime,     // 산책 종료 시간
        String totalTime,      // 총 산책 시간 (00:00:46 형식의 문자열)
        String note,           // 산책에 대한 메모
        String centerPosition, // 중심 위치 (위도, 경도)
        Integer mapLevel,      // 지도 레벨
        String path,           // 산책 경로 (위도, 경도 배열)
        S3Images pathImage,
        Double distance        // 총 거리 (km 단위)
) {}
