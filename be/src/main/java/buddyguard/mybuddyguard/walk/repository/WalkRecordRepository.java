package buddyguard.mybuddyguard.walk.repository;

import buddyguard.mybuddyguard.walk.entity.WalkRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WalkRecordRepository extends JpaRepository<WalkRecord, Long> {

    Optional<WalkRecord> findById(Long id);

}
