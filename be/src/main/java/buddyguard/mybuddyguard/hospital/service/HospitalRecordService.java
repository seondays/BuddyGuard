package buddyguard.mybuddyguard.hospital.service;

import buddyguard.mybuddyguard.hospital.entity.HospitalRecord;
import buddyguard.mybuddyguard.hospital.repository.HospitalRecordRepository;
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
    public HospitalRecord createHospitalRecord(HospitalRecord hospitalRecord) {
        return hospitalRecordRepository.save(hospitalRecord);
    }

    @Transactional
    public Optional<HospitalRecord> updateHospitalRecord(Long id, Long userId, Long petId,
            HospitalRecord hospitalRecord) {
        return hospitalRecordRepository.findByIdAndUserIdAndPetId(id, userId, petId)
                .map(existingRecord -> {
                    existingRecord.setVisitDate(hospitalRecord.getVisitDate());
                    existingRecord.setHospitalName(hospitalRecord.getHospitalName());
                    existingRecord.setDescription(hospitalRecord.getDescription());
                    return hospitalRecordRepository.save(existingRecord);
                });
    }

    @Transactional
    public void deleteHospitalRecord(Long id, Long userId, Long petId) {
        hospitalRecordRepository.deleteByIdAndUserIdAndPetId(id, userId, petId);
    }
}
