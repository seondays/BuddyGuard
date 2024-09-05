package buddyguard.mybuddyguard.weight.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "WEIGHT_RECORDS")
@ToString
@Getter
public class Weight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    long petId;

    LocalDateTime recordedAt;

    double weight;

    @Builder
    public Weight(long petId, LocalDateTime recordedAt, double weight) {
        this.petId = petId;
        this.recordedAt = recordedAt;
        this.weight = weight;
    }
}
