package buddyguard.mybuddyguard.pet.repository;

import buddyguard.mybuddyguard.pet.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Long> {

}
