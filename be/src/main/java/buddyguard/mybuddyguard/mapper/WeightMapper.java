package buddyguard.mybuddyguard.mapper;

import buddyguard.mybuddyguard.weight.entity.Weight;
import buddyguard.mybuddyguard.weight.contoller.request.WeightCreateRequest;
import buddyguard.mybuddyguard.weight.contoller.response.WeightResponse;
import java.util.List;

public class WeightMapper {

    public static WeightResponse toResponse(Weight weight) {
        return new WeightResponse(
                weight.getId(),
                weight.getPetId(),
                weight.getWeight(),
                weight.getRecordedAt(),
                weight.getDescription()
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
                .description(request.description())
                .build();
    }
}
