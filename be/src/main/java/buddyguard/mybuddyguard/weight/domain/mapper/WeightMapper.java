package buddyguard.mybuddyguard.weight.domain.mapper;

import buddyguard.mybuddyguard.weight.domain.Weight;
import buddyguard.mybuddyguard.weight.dto.WeightCreateRequest;
import buddyguard.mybuddyguard.weight.dto.WeightResponse;
import java.util.List;

public class WeightMapper {

    public static WeightResponse toResponse(Weight weight) {
        return new WeightResponse(
                weight.getId(),
                weight.getPetId(),
                weight.getWeight(),
                weight.getRecordedAt(),
                weight.getMemo()
        );
    }

    public static List<WeightResponse> toResponseList(List<Weight> weights) {
        return weights.stream()
                .map(WeightMapper::toResponse)
                .toList();
    }

    public static Weight toEntity(WeightCreateRequest request) {
        return Weight.builder()
                .petId(request.petId())
                .recordedAt(request.recordedAt())
                .weight(request.weight())
                .memo(request.memo())
                .build();
    }
}
