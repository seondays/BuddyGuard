package buddyguard.mybuddyguard.s3.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "S3_IMAGES")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class S3Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;  // S3에 저장된 이미지 URL

    @Column(name = "file_name", nullable = false)
    private String fileName;  // 파일 이름

    @Column(name = "file_type", nullable = false)
    private String fileType;  // 파일 형식 (jpg, png 등)

    @Column(name = "file_size", nullable = false)
    private Long fileSize;    // 파일 크기

    @Column(name = "category", nullable = false)
    private String category;  // 예: "WALK" or "PROFILE"

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;  // 이미지 생성일

}

