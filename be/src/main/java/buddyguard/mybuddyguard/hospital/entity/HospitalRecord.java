package buddyguard.mybuddyguard.hospital.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "HOSPITAL_RECORDS")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class HospitalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "pet_id", nullable = false)
    private Long petId;

    @Column(name = "visit_date", nullable = false)
    private LocalDateTime visitDate;

    @Column(name = "hospital_name", nullable = false)
    private String hospitalName;

    @Column(name = "description", nullable = false)
    private String description;

    public void update(String description, String hospitalName, LocalDateTime visitDate) {
        this.description = description;
        this.hospitalName = hospitalName;
        this.visitDate = visitDate;
    }
}
