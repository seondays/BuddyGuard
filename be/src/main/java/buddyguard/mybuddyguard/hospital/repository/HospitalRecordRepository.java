package buddyguard.mybuddyguard.hospital.repository;

import buddyguard.mybuddyguard.hospital.entity.HospitalRecord;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRecordRepository extends JpaRepository<HospitalRecord, Long> {

    List<HospitalRecord> findByUserIdAndPetId(Long userId, Long petId);

    Optional<HospitalRecord> findByIdAndUserIdAndPetId(Long id, Long userId, Long petId);

}
