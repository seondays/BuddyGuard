package buddyguard.mybuddyguard.walk.repository;

import buddyguard.mybuddyguard.walk.entity.WalkRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public class WalkRecordRepository extends JpaRepository<WalkRecord, Long> {

    List<WalkRecord> findByPetId(Long petId);

    Optional<WalkRecord> findByIdAndPetId(Long id, Long petId);

}
