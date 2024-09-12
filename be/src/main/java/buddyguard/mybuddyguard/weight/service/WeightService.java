package buddyguard.mybuddyguard.weight.service;

import buddyguard.mybuddyguard.weight.entity.Weight;
import buddyguard.mybuddyguard.mapper.WeightMapper;
import buddyguard.mybuddyguard.weight.contoller.request.WeightCreateRequest;
import buddyguard.mybuddyguard.weight.contoller.response.WeightResponse;
import buddyguard.mybuddyguard.weight.contoller.request.WeightUpdateRequest;
import buddyguard.mybuddyguard.weight.repository.WeightRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class WeightService {

    private final WeightRepository weightRepository;

    @Transactional
    public void createNewWeightRecord(WeightCreateRequest request) {
        Weight weight = WeightMapper.toEntity(request);

        Weight savedWeight = weightRepository.save(weight);

        log.info("SAVED WEIGHT : {}", savedWeight);
    }

    public List<WeightResponse> getAllWeightRecords(Long petId) {

        List<Weight> weights = weightRepository.findAllByPetId(petId);

        return WeightMapper.toResponseList(weights);
    }

    public WeightResponse getDetailWeightRecord(Long id) {
        // Optional 처리 고민
        // 즉 값이 없을때 어떻게 하는지에 대한 고민
        // 방법1) 예외를 던지게 한다. 방법2) 기본값을 주게 한다. ex) orElse(new Weight());
        // + 예외를 던지는 걸로 가려면, 어떤 상황에 어떤 예외를 던질지 정해야 한다.
        // ex) id로 값을 찾는 요청인데 없다면 ResourceNotFoundException

        Weight weight = weightRepository.findById(id)
                .orElseThrow(RuntimeException::new);

        return WeightMapper.toResponse(weight);
    }

    @Transactional
    public void updateWeightRecord(Long id, WeightUpdateRequest request) {

        Weight weight = weightRepository.findById(id)
                .orElseThrow(RuntimeException::new);

        weight.update( // 변경 포인트를 해당 메서드에 모아서 하나로 통일한다.
                request.recordedAt(),
                request.weight(),
                request.memo()
        );
        // dirty checking 으로 자동 변경 되고 db에 저장 된다.
    }

    @Transactional
    public void deleteWeightRecord(Long id) {

        Weight weight = weightRepository.findById(id)
                .orElseThrow(RuntimeException::new);

        weightRepository.delete(weight);
    }
}
