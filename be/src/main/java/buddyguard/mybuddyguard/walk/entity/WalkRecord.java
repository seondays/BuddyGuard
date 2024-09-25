package buddyguard.mybuddyguard.walk.entity;

import buddyguard.mybuddyguard.s3.entity.S3Images;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "WALK_RECORDS")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class WalkRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pet_id", nullable = false)
    private Long petId;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "duration", nullable = false)
    private LocalTime duration;

    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;

    @Column(name = "distance", nullable = false)
    private Double distance;

    @Column(name = "description", nullable = false, length = 500)
    private String description;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id", nullable = false)
    private S3Images image;

    public void update(LocalTime startTime, LocalTime endTime, LocalTime duration, LocalDate createdAt, Double distance, String description, S3Images image) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.createdAt = createdAt;
        this.distance = distance;
        this.description = description;
        this.image = image;
    }
}
