package buddyguard.mybuddyguard.weight.contoller;

import buddyguard.mybuddyguard.weight.contoller.request.WeightCreateRequest;
import buddyguard.mybuddyguard.weight.contoller.response.WeightResponse;
import buddyguard.mybuddyguard.weight.contoller.request.WeightUpdateRequest;
import buddyguard.mybuddyguard.weight.service.WeightService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/weight")
public class WeightController {

    private final WeightService weightService;

    @GetMapping("/{petId}")
    public ResponseEntity<List<WeightResponse>> getAllWeightRecords(
            @PathVariable("petId") Long petId) {

        List<WeightResponse> responses = weightService.getAllWeightRecords(petId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{petId}/detail/{id}")
    public ResponseEntity<WeightResponse> getDetailWeightRecord(
            @PathVariable("petId") Long petId,
            @PathVariable("id") Long id) {

        WeightResponse response = weightService.getDetailWeightRecord(id, petId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Void> createNewWeightRecord(@RequestBody WeightCreateRequest request) {

        weightService.createNewWeightRecord(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{petId}/detail/{id}")
    public ResponseEntity<Void> updateWeightRecord(
            @PathVariable("petId") Long petId,
            @PathVariable("id") Long id,
            @RequestBody WeightUpdateRequest request) {

        weightService.updateWeightRecord(id, petId, request);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeightRecord(@PathVariable("id") Long id) {

        weightService.deleteWeightRecord(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
