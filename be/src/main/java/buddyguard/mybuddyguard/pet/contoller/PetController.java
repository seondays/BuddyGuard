package buddyguard.mybuddyguard.pet.contoller;

import buddyguard.mybuddyguard.pet.contoller.request.PetRegisterRequest;
import buddyguard.mybuddyguard.pet.contoller.response.PetWithUserListResponse;
import buddyguard.mybuddyguard.pet.service.PetService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class PetController {

    private final PetService service;

    public PetController(PetService service) {
        this.service = service;
    }

    // 반려동물 등록
    @PostMapping("/pet")
    public ResponseEntity<?> registerPet(@RequestBody PetRegisterRequest petRegisterRequest) {

        service.register(petRegisterRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 회원과 연결된 반려동물 조회
    @GetMapping("/pet/{userId}")
    public ResponseEntity<List<PetWithUserListResponse>> getPetWithUser(
            @PathVariable("userId") Long userId) {
        List<PetWithUserListResponse> response = service.getPetWithUser(userId);

        return ResponseEntity.ok(response);
    }
}
