package buddyguard.mybuddyguard.pet.repository;

import buddyguard.mybuddyguard.pet.entity.UserPet;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPetRepository extends JpaRepository<UserPet, Long> {
    @Query("SELECT count(*) >= 3 FROM UserPet u where u.id = :userId")
    boolean existsByUserExceedPetCount(@Param("userId") Long userId);

    List<UserPet> findByUserId(Long userId);
}
