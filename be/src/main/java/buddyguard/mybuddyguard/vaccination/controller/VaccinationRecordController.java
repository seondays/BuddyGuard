package buddyguard.mybuddyguard.vaccination.controller;

import buddyguard.mybuddyguard.vaccination.controller.request.VaccinationCreateRequest;
import buddyguard.mybuddyguard.vaccination.service.VaccinationRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/vaccination")
public class VaccinationRecordController {

    private final VaccinationRecordService vaccinationRecordService;

    @PostMapping
    public ResponseEntity<Void> createVaccinationRecord(@Valid @RequestBody VaccinationCreateRequest request) {

        vaccinationRecordService.createVaccinationRecord(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}
