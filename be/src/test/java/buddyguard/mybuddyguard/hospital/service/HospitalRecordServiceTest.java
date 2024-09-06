package buddyguard.mybuddyguard.hospital.service;

import buddyguard.mybuddyguard.hospital.entity.HospitalRecord;
import buddyguard.mybuddyguard.hospital.repository.HospitalRecordRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class HospitalRecordServiceTest {

    @Mock
    private HospitalRecordRepository hospitalRecordRepository;

    @InjectMocks
    private HospitalRecordService hospitalRecordService;

    private HospitalRecord 샘플기록;

    @BeforeEach
    void setUp() {
        샘플기록 = new HospitalRecord(1L, 1L, 1L, LocalDate.now(), "병원", "정기 검진");
    }

    @Test
    void 모든_병원기록_조회_시_기록목록_반환() {
        // Given
        Long 사용자ID = 1L;
        Long 반려동물ID = 1L;
        List<HospitalRecord> 예상기록목록 = Arrays.asList(샘플기록);
        when(hospitalRecordRepository.findByUserIdAndPetId(사용자ID, 반려동물ID)).thenReturn(예상기록목록);

        // When
        List<HospitalRecord> 실제기록목록 = hospitalRecordService.getAllHospitalRecords(사용자ID, 반려동물ID);

        // Then
        assertThat(실제기록목록)
                .isNotNull()
                .hasSize(1)
                .isEqualTo(예상기록목록);
        verify(hospitalRecordRepository).findByUserIdAndPetId(사용자ID, 반려동물ID);
    }

    @Test
    void 등록된_병원기록_조회_시_해당_기록_반환() {
        // Given
        Long 기록ID = 1L;
        Long 사용자ID = 1L;
        Long 반려동물ID = 1L;
        when(hospitalRecordRepository.findByIdAndUserIdAndPetId(기록ID, 사용자ID, 반려동물ID)).thenReturn(
                Optional.of(샘플기록));

        // When
        Optional<HospitalRecord> 결과 = hospitalRecordService.getHospitalRecord(기록ID, 사용자ID, 반려동물ID);

        // Then
        assertThat(결과)
                .isPresent()
                .hasValueSatisfying(기록 -> {
                    assertThat(기록.getId()).isEqualTo(샘플기록.getId());
                    assertThat(기록.getUserId()).isEqualTo(샘플기록.getUserId());
                    assertThat(기록.getPetId()).isEqualTo(샘플기록.getPetId());
                    assertThat(기록.getVisitDate()).isEqualTo(샘플기록.getVisitDate());
                    assertThat(기록.getHospitalName()).isEqualTo(샘플기록.getHospitalName());
                    assertThat(기록.getDescription()).isEqualTo(샘플기록.getDescription());
                });
        verify(hospitalRecordRepository).findByIdAndUserIdAndPetId(기록ID, 사용자ID, 반려동물ID);
    }

    @Test
    void 병원기록_생성_시_생성된_기록_반환() {
        // Given
        Long 사용자ID = 1L;
        Long 반려동물ID = 1L;
        when(hospitalRecordRepository.save(any(HospitalRecord.class))).thenReturn(샘플기록);

        // When
        HospitalRecord 생성된기록 = hospitalRecordService.createHospitalRecord(사용자ID, 반려동물ID, 샘플기록);

        // Then
        assertThat(생성된기록)
                .isNotNull()
                .usingRecursiveComparison()
                .isEqualTo(샘플기록);
        verify(hospitalRecordRepository).save(any(HospitalRecord.class));
    }

    @Test
    void 존재하는_병원기록_업데이트_시_업데이트된_기록_반환() {
        // Given
        Long 기록ID = 1L;
        Long 사용자ID = 1L;
        Long 반려동물ID = 1L;
        HospitalRecord 업데이트된기록 = new HospitalRecord(기록ID, 사용자ID, 반려동물ID, LocalDate.now(),
                "업데이트된 병원", "후속 진료");
        when(hospitalRecordRepository.findByIdAndUserIdAndPetId(기록ID, 사용자ID, 반려동물ID)).thenReturn(
                Optional.of(샘플기록));
        when(hospitalRecordRepository.save(any(HospitalRecord.class))).thenReturn(업데이트된기록);

        // When
        Optional<HospitalRecord> 결과 = hospitalRecordService.updateHospitalRecord(기록ID, 사용자ID,
                반려동물ID, 업데이트된기록.getVisitDate(),업데이트된기록.getHospitalName(),업데이트된기록.getDescription());

        // Then
        assertThat(결과)
                .isPresent()
                .hasValueSatisfying(기록 -> {
                    assertThat(기록.getId()).isEqualTo(업데이트된기록.getId());
                    assertThat(기록.getUserId()).isEqualTo(업데이트된기록.getUserId());
                    assertThat(기록.getPetId()).isEqualTo(업데이트된기록.getPetId());
                    assertThat(기록.getVisitDate()).isEqualTo(업데이트된기록.getVisitDate());
                    assertThat(기록.getHospitalName()).isEqualTo(업데이트된기록.getHospitalName());
                    assertThat(기록.getDescription()).isEqualTo(업데이트된기록.getDescription());
                });
        verify(hospitalRecordRepository).findByIdAndUserIdAndPetId(기록ID, 사용자ID, 반려동물ID);
        verify(hospitalRecordRepository).save(any(HospitalRecord.class));
    }

    @Test
    void 병원기록_삭제_시_리포지토리_호출() {
        // Given
        Long 기록ID = 1L;
        Long 사용자ID = 1L;
        Long 반려동물ID = 1L;

        // When
        hospitalRecordService.deleteHospitalRecord(기록ID, 사용자ID, 반려동물ID);

        // Then
        verify(hospitalRecordRepository).deleteByIdAndUserIdAndPetId(기록ID, 사용자ID, 반려동물ID);
    }
}
