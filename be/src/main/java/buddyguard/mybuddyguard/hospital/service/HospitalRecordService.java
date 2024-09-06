package buddyguard.mybuddyguard.hospital.service;

import buddyguard.mybuddyguard.hospital.entity.HospitalRecord;
import buddyguard.mybuddyguard.hospital.repository.HospitalRecordRepository;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HospitalRecordService {

    private final HospitalRecordRepository hospitalRecordRepository;

    @Autowired
    public HospitalRecordService(HospitalRecordRepository hospitalRecordRepository) {
        this.hospitalRecordRepository = hospitalRecordRepository;
    }

    public List<HospitalRecord> getAllHospitalRecords(Long userId, Long petId) {
        return hospitalRecordRepository.findByUserIdAndPetId(userId, petId);
    }

    public Optional<HospitalRecord> getHospitalRecord(Long id, Long userId, Long petId) {
        return hospitalRecordRepository.findByIdAndUserIdAndPetId(id, userId, petId);
    }


    @Transactional
    public HospitalRecord createHospitalRecord(Long userId, Long petId,
            HospitalRecord hospitalRecord) {
        HospitalRecord recordWithIds = new HospitalRecord(
                hospitalRecord.getId(),
                userId,
                petId,
                hospitalRecord.getVisitDate(),
                hospitalRecord.getHospitalName(),
                hospitalRecord.getDescription()
        );
        return hospitalRecordRepository.save(recordWithIds);
    }

    @Transactional
    public Optional<HospitalRecord> updateHospitalRecord(Long id, Long userId, Long petId,
            LocalDate visitDate, String hospitalName,
            String description) {
        return hospitalRecordRepository.findByIdAndUserIdAndPetId(id, userId, petId)
                .map(existingRecord -> {
                    HospitalRecord updatedRecord = new HospitalRecord(
                            existingRecord.getId(),
                            existingRecord.getUserId(),
                            existingRecord.getPetId(),
                            visitDate,
                            hospitalName,
                            description
                    );
                    return hospitalRecordRepository.save(updatedRecord);
                });
    }


    @Transactional
    public void deleteHospitalRecord(Long id, Long userId, Long petId) {
        hospitalRecordRepository.deleteByIdAndUserIdAndPetId(id, userId, petId);
    }
}
