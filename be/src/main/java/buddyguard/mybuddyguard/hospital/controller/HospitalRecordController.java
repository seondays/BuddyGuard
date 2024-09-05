package buddyguard.mybuddyguard.hospital.controller;

import buddyguard.mybuddyguard.hospital.entity.HospitalRecord;
import buddyguard.mybuddyguard.hospital.service.HospitalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/{userId}/{petId}/hospital-records")
public class HospitalRecordController {

    private final HospitalRecordService hospitalRecordService;

    @Autowired
    public HospitalRecordController(HospitalRecordService hospitalRecordService) {
        this.hospitalRecordService = hospitalRecordService;
    }

    @GetMapping
    public ResponseEntity<List<HospitalRecord>> getAllHospitalRecords(@PathVariable Long userId,
            @PathVariable Long petId) {
        List<HospitalRecord> records = hospitalRecordService.getAllHospitalRecords(userId, petId);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HospitalRecord> getHospitalRecord(@PathVariable Long userId,
            @PathVariable Long petId, @PathVariable Long id) {
        return hospitalRecordService.getHospitalRecord(id, userId, petId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<HospitalRecord> createHospitalRecord(@PathVariable Long userId,
            @PathVariable Long petId, @RequestBody HospitalRecord hospitalRecord) {
        hospitalRecord.setUserId(userId);
        hospitalRecord.setPetId(petId);
        HospitalRecord createdRecord = hospitalRecordService.createHospitalRecord(hospitalRecord);
        return ResponseEntity.ok(createdRecord);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HospitalRecord> updateHospitalRecord(@PathVariable Long userId,
            @PathVariable Long petId, @PathVariable Long id,
            @RequestBody HospitalRecord hospitalRecord) {
        return hospitalRecordService.updateHospitalRecord(id, userId, petId, hospitalRecord)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHospitalRecord(@PathVariable Long userId,
            @PathVariable Long petId, @PathVariable Long id) {
        hospitalRecordService.deleteHospitalRecord(id, userId, petId);
        return ResponseEntity.noContent().build();
    }
}
