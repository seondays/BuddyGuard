package buddyguard.mybuddyguard.vaccination.repository;

import buddyguard.mybuddyguard.vaccination.entity.VaccinationRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccinationRecordRepository extends JpaRepository<VaccinationRecord, Long> {

}
