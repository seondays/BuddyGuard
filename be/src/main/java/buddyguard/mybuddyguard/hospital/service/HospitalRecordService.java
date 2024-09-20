package buddyguard.mybuddyguard.hospital.service;

import buddyguard.mybuddyguard.hospital.controller.reponse.HospitalRecordResponse;
import buddyguard.mybuddyguard.hospital.controller.request.HospitalRecordCreateRequest;
import buddyguard.mybuddyguard.hospital.controller.request.HospitalRecordUpdateRequest;
import buddyguard.mybuddyguard.hospital.entity.HospitalRecord;
import buddyguard.mybuddyguard.exception.RecordNotFoundException;
import buddyguard.mybuddyguard.hospital.mapper.HospitalRecordMapper;
import buddyguard.mybuddyguard.hospital.repository.HospitalRecordRepository;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class HospitalRecordService {

    private final HospitalRecordRepository hospitalRecordRepository;

    public List<HospitalRecordResponse> getAllHospitalRecords(Long userId, Long petId) {
        List<HospitalRecord> records = hospitalRecordRepository.findByUserIdAndPetId(userId, petId);
        return records.stream()
                .map(HospitalRecordMapper::toResponse)
                .collect(Collectors.toList());
    }

    public HospitalRecordResponse getHospitalRecord(Long id, Long userId, Long petId) {
        return hospitalRecordRepository.findByIdAndUserIdAndPetId(id, userId, petId)
                .map(HospitalRecordMapper::toResponse)
                .orElseThrow(RecordNotFoundException::new);
    }

    @Transactional
    public void createHospitalRecord(HospitalRecordCreateRequest request) {
        HospitalRecord hospitalRecord = HospitalRecordMapper.toEntity(request.userId(),
                request.petId(), request);

        HospitalRecord saveHospitalRecord = hospitalRecordRepository.save(hospitalRecord);

        log.info("SAVED HOSPITAL RECORD : {}", saveHospitalRecord);
    }

    @Transactional
    public void updateHospitalRecord(Long id, Long userId, Long petId,
            HospitalRecordUpdateRequest request) {
        HospitalRecord hospitalRecord = hospitalRecordRepository.findByIdAndUserIdAndPetId(id,
                        userId, petId)
                .orElseThrow(RecordNotFoundException::new); // 예외 처리

        hospitalRecord.update(
                request.description(),
                request.hospitalName(),
                request.visitDate()
        );
        hospitalRecordRepository.save(hospitalRecord);
    }

    @Transactional
    public void deleteHospitalRecord(Long id, Long userId, Long petId) {
        HospitalRecord record = hospitalRecordRepository.findByIdAndUserIdAndPetId(id, userId,
                        petId)
                .orElseThrow(RecordNotFoundException::new); // 예외 처리

        hospitalRecordRepository.delete(record);
    }
}
