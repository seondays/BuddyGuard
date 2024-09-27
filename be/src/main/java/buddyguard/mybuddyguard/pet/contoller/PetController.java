package buddyguard.mybuddyguard.pet.contoller;

import buddyguard.mybuddyguard.pet.contoller.request.PetRegisterRequest;
import buddyguard.mybuddyguard.pet.contoller.request.PetUpdateInformationRequest;
import buddyguard.mybuddyguard.pet.contoller.response.PetWithUserListResponse;
import buddyguard.mybuddyguard.pet.service.PetService;
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
@RequestMapping("/pet")
public class PetController {

    private final PetService service;

    @PostMapping
    public ResponseEntity<Void> registerPet(@RequestBody PetRegisterRequest petRegisterRequest) {
        service.register(petRegisterRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<PetWithUserListResponse>> getPetWithUser(
            @PathVariable("userId") Long userId) {
        List<PetWithUserListResponse> response = service.getPetWithUser(userId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/{petId}")
    public ResponseEntity<PetWithUserListResponse> getOnePetWithUser(
            @PathVariable("userId") Long userId, @PathVariable("petId") Long petId) {
        PetWithUserListResponse response = service.getOnePetWithUser(userId, petId);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}/{petId}")
    public ResponseEntity<Void> deletePet(@PathVariable("userId") Long userId,
            @PathVariable("petId") Long petId) {
        service.delete(userId, petId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{userId}/{petId}")
    public ResponseEntity<Void> updatePetInformation(@PathVariable("userId") Long userId,
            @PathVariable("petId") Long petId,
            @RequestBody PetUpdateInformationRequest petUpdateInformationRequest) {
        service.update(userId, petId, petUpdateInformationRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
