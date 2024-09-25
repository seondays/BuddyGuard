package buddyguard.mybuddyguard.walk.service;

import buddyguard.mybuddyguard.exception.RecordNotFoundException;
import buddyguard.mybuddyguard.walk.controller.response.WalkRecordResponse;
import buddyguard.mybuddyguard.walk.controller.request.WalkRecordCreateRequest;
import buddyguard.mybuddyguard.walk.controller.request.WalkRecordUpdateRequest;
import buddyguard.mybuddyguard.walk.entity.WalkRecord;
import buddyguard.mybuddyguard.walk.mapper.WalkRecordMapper;
import buddyguard.mybuddyguard.walk.repository.WalkRecordRepository;
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

    public List<WalkRecordResponse> getAllWalkRecords(Long petId) {
        List<WalkRecord> records = walkRecordRepository.findByPetId(petId);
        return records.stream()
                .map(WalkRecordMapper::toResponse)
                .collect(Collectors.toList());
    }

    public WalkRecordResponse getWalkRecord(Long id, Long petId) {
        return walkRecordRepository.findByIdAndPetId(id, petId)
                .map(WalkRecordMapper::toResponse)
                .orElseThrow(RecordNotFoundException::new);
    }

    @Transactional
    public void createWalkRecord(WalkRecordCreateRequest request) {
        WalkRecord walkRecord = WalkRecordMapper.toEntity(request);

        WalkRecord savedWalkRecord = walkRecordRepository.save(walkRecord);

        log.info("SAVED WALK RECORD: {}", savedWalkRecord);
    }

    @Transactional
    public void updateWalkRecord(Long id, Long petId, WalkRecordUpdateRequest request) {
        WalkRecord walkRecord = walkRecordRepository.findByIdAndPetId(id, petId)
                .orElseThrow(RecordNotFoundException::new); // 예외 처리

        walkRecord.update(
                request.startTime(),
                request.endTime(),
                request.duration(),
                request.createdAt(),
                request.distance(),
                request.description(),
                request.image()
        );

        walkRecordRepository.save(walkRecord);
    }

    @Transactional
    public void deleteWalkRecord(Long id, Long petId) {
        WalkRecord walkRecord = walkRecordRepository.findByIdAndPetId(id, petId)
                .orElseThrow(RecordNotFoundException::new); // 예외 처리

        walkRecordRepository.delete(walkRecord);
    }
}
