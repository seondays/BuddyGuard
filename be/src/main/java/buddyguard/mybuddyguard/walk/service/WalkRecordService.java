package buddyguard.mybuddyguard.walk.service;

import buddyguard.mybuddyguard.exception.RecordNotFoundException;
import buddyguard.mybuddyguard.walk.controller.response.WalkRecordResponse;
import buddyguard.mybuddyguard.walk.controller.request.WalkRecordCreateRequest;
import buddyguard.mybuddyguard.walk.controller.request.WalkRecordUpdateRequest;
import buddyguard.mybuddyguard.walk.entity.WalkRecord;
import buddyguard.mybuddyguard.walk.mapper.WalkRecordMapper;
import buddyguard.mybuddyguard.walk.repository.WalkRecordRepository;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class WalkRecordService {

    private final WalkRecordRepository walkRecordRepository;

    // 특정 반려동물의 전체 산책 기록 조회
    public List<WalkRecordResponse> getAllWalkRecords(Long petId) {
        return walkRecordRepository.findAll().stream()
                .filter(record -> record.hasBuddy(petId)) // buddyIds에서 해당 petId를 확인
                .map(WalkRecordMapper::toResponse)
                .collect(Collectors.toList());
    }

    // 특정 산책 기록에서 특정 반려동물이 참여한 기록만 조회
    public WalkRecordResponse getWalkRecord(Long id, Long petId) {
        return walkRecordRepository.findById(id)
                .filter(record -> record.hasBuddy(petId)) // 특정 기록에서 petId 확인
                .map(WalkRecordMapper::toResponse)
                .orElseThrow(RecordNotFoundException::new); // petId가 포함된 기록이 없을 때 예외 처리
    }

    @Transactional
    public void createWalkRecord(WalkRecordCreateRequest request) {
        WalkRecord walkRecord = WalkRecordMapper.toEntity(request, null);  // S3Images는 별도로 처리
        WalkRecord savedWalkRecord = walkRecordRepository.save(walkRecord);
        log.info("SAVED WALK RECORD: {}", savedWalkRecord);
    }

    // 특정 반려동물의 주간 산책 기록을 조회하는 메서드
    public List<WalkRecordResponse> getWeeklyRecords(Long petId, LocalDate requestedDate) {
        // 해당 주의 시작일 (일요일)
        LocalDate startOfWeek = requestedDate.with(java.time.DayOfWeek.SUNDAY);
        // 해당 주의 종료일 (토요일)
        LocalDate endOfWeek = startOfWeek.plusDays(6);

        // 주간 범위 내의 산책 기록 조회
        return walkRecordRepository.findAll().stream()
                .filter(record -> record.hasBuddy(petId)) // buddyIds에서 해당 petId 확인
                .filter(record -> isWithinRange(record.getStartDate(), startOfWeek,
                        endOfWeek)) // 주간 범위 내에 있는지 확인
                .map(WalkRecordMapper::toResponse) // WalkRecordResponse로 변환
                .collect(Collectors.toList());
    }

    // 특정 반려동물의 월간 산책 기록을 조회하는 메서드
    public List<WalkRecordResponse> getMonthlyRecords(Long petId, LocalDate requestedDate) {
        // 해당 월의 시작일 (1일)
        LocalDate startOfMonth = requestedDate.withDayOfMonth(1);
        // 해당 월의 마지막 날 계산
        LocalDate endOfMonth = requestedDate.with(TemporalAdjusters.lastDayOfMonth());

        // 월간 범위 내의 산책 기록 조회
        return walkRecordRepository.findAll().stream()
                .filter(record -> record.hasBuddy(petId)) // buddyIds에서 해당 petId 확인
                .filter(record -> isWithinRange(record.getStartDate(), startOfMonth,
                        endOfMonth)) // 월간 범위 내에 있는지 확인
                .map(WalkRecordMapper::toResponse) // WalkRecordResponse로 변환
                .collect(Collectors.toList());
    }

    // 주어진 날짜가 특정 범위 내에 있는지 확인하는 메서드
    private boolean isWithinRange(LocalDate recordDate, LocalDate startDate, LocalDate endDate) {
        return (recordDate.isEqual(startDate) || recordDate.isAfter(startDate)) &&
                (recordDate.isEqual(endDate) || recordDate.isBefore(endDate));
    }


    @Transactional
    public void updateWalkRecord(Long id, Long petId, WalkRecordUpdateRequest request) {
        WalkRecord walkRecord = walkRecordRepository.findById(id)
                .orElseThrow(RecordNotFoundException::new); // 예외 처리

        // 해당 기록에 petId가 포함되어 있는지 확인
        if (walkRecord.hasBuddy(petId)) {
            walkRecord.update(
                    request.startDate(),
                    request.endDate(),
                    request.startTime(),
                    request.endTime(),
                    request.totalTime(),
                    request.buddyIds(),
                    request.note(),
                    request.centerPosition(),
                    request.mapLevel(),
                    request.path(),
                    request.pathImage(),
                    request.distance()
            );
            walkRecordRepository.save(walkRecord);
        } else {
            throw new RecordNotFoundException(); // petId가 기록에 없을 때 예외 처리
        }
    }

    @Transactional
    public void deleteWalkRecord(Long id, Long petId) {
        WalkRecord walkRecord = walkRecordRepository.findById(id)
                .orElseThrow(RecordNotFoundException::new); // 예외 처리

        // 해당 기록에 petId가 포함되어 있는지 확인 후 삭제
        if (walkRecord.hasBuddy(petId)) {
            walkRecordRepository.delete(walkRecord);
        } else {
            throw new RecordNotFoundException(); // petId가 기록에 없을 때 예외 처리
        }
    }
}
