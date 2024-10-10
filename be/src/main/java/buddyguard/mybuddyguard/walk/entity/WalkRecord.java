package buddyguard.mybuddyguard.walk.entity;

import buddyguard.mybuddyguard.s3.entity.S3Images;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "WALK_RECORDS")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class WalkRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 선택한 버디들의 ID 배열을 문자열로 저장
    @Column(name = "buddy_ids", nullable = false)
    private String buddyIds;

    // 산책 시작 날짜 (예: 2024년 10월 7일)
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    // 산책 종료 날짜 (예: 2024년 10월 7일)
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    // 산책 시작 시간 (예: 23:40)
    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    // 산책 종료 시간 (예: 23:41)
    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    // 총 산책 시간 (예: 00:00:46)
    @Column(name = "total_time", nullable = false)
    private String totalTime;

    // 산책에 대한 메모
    @Column(name = "note", nullable = false)
    private String note;

    // 산책 경로의 중심 위치 (위도, 경도), JSON 문자열로 저장
    @Column(name = "center_position", nullable = false)
    private String centerPosition;

    // 지도 레벨
    @Column(name = "map_level", nullable = false)
    private Integer mapLevel;

    // 산책 경로 (위도, 경도 배열), JSON 문자열로 저장
    @Column(name = "path", nullable = false, columnDefinition = "TEXT")
    private String path;

    // 산책 경로 이미지를 파일 경로로 저장 (이미지 업로드는 별도의 로직에서 처리)
    @OneToOne(fetch = FetchType.LAZY)
    @Column(name = "path_image", nullable = false)
    private S3Images pathImage;

    // 총 거리 (km), 최대 소수점 3자리까지
    @Column(name = "distance", nullable = false)
    private Double distance;

    // 반려동물 ID 배열을 파싱하여 특정 반려동물이 산책에 참여했는지 확인
    public boolean hasBuddy(Long petId) {
        String[] buddyArray = buddyIds.replace("[", "").replace("]", "").split(",");
        for (String id : buddyArray) {
            if (Long.parseLong(id.trim()) == petId) {
                return true;
            }
        }
        return false;
    }

    public void update(LocalDate startDate, LocalDate endDate, LocalTime startTime,
            LocalTime endTime, String totalTime, String buddyIds, String note,
            String centerPosition, Integer mapLevel, String path, S3Images pathImage,
            Double distance) {

        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalTime = totalTime;
        this.buddyIds = buddyIds;  // buddyIds로 수정
        this.note = note;
        this.centerPosition = centerPosition;
        this.mapLevel = mapLevel;
        this.path = path;
        this.pathImage = pathImage;
        this.distance = distance;
    }
}
