package buddyguard.mybuddyguard.hospital.service;

import buddyguard.mybuddyguard.hospital.controller.reponse.HospitalRecordResponse;
import buddyguard.mybuddyguard.hospital.entity.HospitalRecord;
import buddyguard.mybuddyguard.exception.RecordNotFoundException;
import buddyguard.mybuddyguard.hospital.mapper.HospitalRecordMapper;
import buddyguard.mybuddyguard.hospital.repository.HospitalRecordRepository;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HospitalRecordService {

    private final HospitalRecordRepository hospitalRecordRepository;

    @Autowired
    public HospitalRecordService(HospitalRecordRepository hospitalRecordRepository) {
        this.hospitalRecordRepository = hospitalRecordRepository;
    }

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
    public HospitalRecordResponse createHospitalRecord(Long userId, Long petId,
            HospitalRecord hospitalRecord) {
        HospitalRecord recordWithIds = new HospitalRecord(
                hospitalRecord.getId(),
                userId,
                petId,
                hospitalRecord.getVisitDate(),
                hospitalRecord.getHospitalName(),
                hospitalRecord.getDescription()
        );
        HospitalRecord savedRecord = hospitalRecordRepository.save(recordWithIds);
        return HospitalRecordMapper.toResponse(savedRecord);
    }

    @Transactional
    public HospitalRecordResponse updateHospitalRecord(Long id, Long userId, Long petId,
            LocalDateTime visitDate, String hospitalName, String description) {
        HospitalRecord existingRecord = hospitalRecordRepository.findByIdAndUserIdAndPetId(id,
                        userId, petId)
                .orElseThrow(RecordNotFoundException::new); // 예외 처리

        HospitalRecord updatedRecord = new HospitalRecord(
                existingRecord.getId(),
                existingRecord.getUserId(),
                existingRecord.getPetId(),
                visitDate,
                hospitalName,
                description
        );

        HospitalRecord savedRecord = hospitalRecordRepository.save(updatedRecord);
        return HospitalRecordMapper.toResponse(savedRecord);
    }


    @Transactional
    public void deleteHospitalRecord(Long id, Long userId, Long petId) {
        HospitalRecord record = hospitalRecordRepository.findByIdAndUserIdAndPetId(id, userId,
                        petId)
                .orElseThrow(RecordNotFoundException::new); // 예외 처리

        hospitalRecordRepository.delete(record);
    }
}
