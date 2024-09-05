package buddyguard.mybuddyguard.weight.contoller;

import buddyguard.mybuddyguard.weight.domain.Weight;
import buddyguard.mybuddyguard.weight.dto.WeightCreateRequest;
import buddyguard.mybuddyguard.weight.service.WeightService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/weight")
public class WeightController {

    private final WeightService weightService;

    @GetMapping
    public List<Weight> getAllWeightRecords(@RequestParam("petId") Long petId) {

        return weightService.getAllWeightRecords(petId);
    }

    @PostMapping
    public void createNewWeightRecord(@RequestBody WeightCreateRequest request) {
        weightService.createNewWeightRecord(request);
    }
}
