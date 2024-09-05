package buddyguard.mybuddyguard.weight.service;

import buddyguard.mybuddyguard.weight.domain.Weight;
import buddyguard.mybuddyguard.weight.dto.WeightCreateRequest;
import buddyguard.mybuddyguard.weight.repository.WeightRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WeightService {

    private final WeightRepository weightRepository;

    public void createNewWeightRecord(WeightCreateRequest request) {
        Weight weight = toEntity(request);

        Weight savedWeight = weightRepository.save(weight);

        log.info("SAVED WEIGHT : {}", savedWeight);
    }

    public List<Weight> getAllWeightRecords(Long petId) {

        return weightRepository.findAllByPetId(petId);
    }

    private Weight toEntity(WeightCreateRequest request) {
        return Weight.builder()
                .petId(request.petId())
                .recordedAt(request.recordedAt())
                .weight(request.weight())
                .build();
    }
}
