package buddyguard.mybuddyguard.hospital.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "HOSPITAL_RECORDS")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class HospitalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "pet_id", nullable = false)
    private Long petId;

    @Column(name = "visit_date", nullable = false)
    private LocalDate visitDate;

    @Column(name = "hospital_name", nullable = false)
    private String hospitalName;

    @Column(name = "description", nullable = false)
    private String description;
}
