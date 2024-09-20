package buddyguard.mybuddyguard.hospital.controller;

import buddyguard.mybuddyguard.hospital.controller.reponse.HospitalRecordResponse;
import buddyguard.mybuddyguard.hospital.controller.request.HospitalRecordCreateRequest;
import buddyguard.mybuddyguard.hospital.controller.request.HospitalRecordUpdateRequest;
import buddyguard.mybuddyguard.hospital.service.HospitalRecordService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hospitalRecords/{userId}/{petId}")
public class HospitalRecordController {

    private final HospitalRecordService hospitalRecordService;

    @Autowired
    public HospitalRecordController(HospitalRecordService hospitalRecordService) {
        this.hospitalRecordService = hospitalRecordService;
    }

    @GetMapping
    public ResponseEntity<List<HospitalRecordResponse>> getAllHospitalRecords(
            @PathVariable Long userId,
            @PathVariable Long petId) {
        List<HospitalRecordResponse> records = hospitalRecordService.getAllHospitalRecords(userId,
                petId);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<HospitalRecordResponse> getHospitalRecord(
            @PathVariable Long userId,
            @PathVariable Long petId,
            @PathVariable Long id) {
        HospitalRecordResponse record = hospitalRecordService.getHospitalRecord(id, userId, petId);
        return ResponseEntity.ok(record);
    }

    @PostMapping
    public ResponseEntity<Void> createHospitalRecord(
            @Valid @RequestBody HospitalRecordCreateRequest request) {
        hospitalRecordService.createHospitalRecord(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/detail/{id}")
    public ResponseEntity<Void> updateHospitalRecord(
            @PathVariable Long userId,
            @PathVariable Long petId,
            @PathVariable Long id,
            @Valid @RequestBody HospitalRecordUpdateRequest request) {

        hospitalRecordService.updateHospitalRecord(userId, petId, id, request);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/detail/{id}")
    public ResponseEntity<Void> deleteHospitalRecord(
            @PathVariable Long userId,
            @PathVariable Long petId,
            @PathVariable Long id) {

        hospitalRecordService.deleteHospitalRecord(userId, petId, id);

        return ResponseEntity.noContent().build();
    }
}
