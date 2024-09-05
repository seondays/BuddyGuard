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

    public Weight getDetailWeightRecord(Long id) {
        // Optional 처리 고민
        // 즉 값이 없을때 어떻게 하는지에 대한 고민
        // 방법1) 예외를 던지게 한다. 방법2) 기본값을 주게 한다. ex) orElse(new Weight());
        // + 예외를 던지는 걸로 가려면, 어떤 상황에 어떤 예외를 던질지 정해야 한다.
        // ex) id로 값을 찾는 요청인데 없다면 ResourceNotFoundException

        return weightRepository.findById(id)
                .orElseThrow(RuntimeException::new);
    }

    private Weight toEntity(WeightCreateRequest request) {
        return Weight.builder()
                .petId(request.petId())
                .recordedAt(request.recordedAt())
                .weight(request.weight())
                .build();
    }
}
