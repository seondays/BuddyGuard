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

    // 반려동물 등록
    @PostMapping
    public ResponseEntity<?> registerPet(@RequestBody PetRegisterRequest petRegisterRequest) {

        service.register(petRegisterRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 회원과 연결된 반려동물 조회
    @GetMapping("/{userId}")
    public ResponseEntity<List<PetWithUserListResponse>> getPetWithUser(
            @PathVariable("userId") Long userId) {
        List<PetWithUserListResponse> response = service.getPetWithUser(userId);

        return ResponseEntity.ok(response);
    }

    // 반려동물 삭제
    @DeleteMapping("/{userId}/{petId}")
    public ResponseEntity<?> deletePet(@PathVariable("userId") Long userId,
            @PathVariable("petId") Long petId) {
        service.delete(userId, petId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 반려동물 수정
    @PatchMapping("/{userId}/{petId}")
    public ResponseEntity<?> updatePetInformation(@PathVariable("userId") Long userId,
            @PathVariable("petId") Long petId,
            @RequestBody PetUpdateInformationRequest petUpdateInformationRequest) {
        service.update(userId, petId, petUpdateInformationRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
