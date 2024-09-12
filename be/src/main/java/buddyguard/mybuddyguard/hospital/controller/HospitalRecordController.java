package buddyguard.mybuddyguard.hospital.controller;

import buddyguard.mybuddyguard.hospital.dto.HospitalRecordDTO;
import buddyguard.mybuddyguard.hospital.entity.HospitalRecord;
import buddyguard.mybuddyguard.hospital.service.HospitalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<HospitalRecordDTO>> getAllHospitalRecords(@PathVariable Long userId,
            @PathVariable Long petId) {
        List<HospitalRecordDTO> records = hospitalRecordService.getAllHospitalRecords(userId,
                petId);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<HospitalRecordDTO> getHospitalRecord(@PathVariable Long userId,
            @PathVariable Long petId, @PathVariable Long id) {
        HospitalRecordDTO record = hospitalRecordService.getHospitalRecord(id, userId, petId);
        return ResponseEntity.ok(record);
    }

    @PostMapping
    public ResponseEntity<HospitalRecordDTO> createHospitalRecord(@PathVariable Long userId,
            @PathVariable Long petId, @RequestBody HospitalRecord hospitalRecord) {
        HospitalRecordDTO createdRecord = hospitalRecordService.createHospitalRecord(userId, petId,
                hospitalRecord);
        return ResponseEntity.ok(createdRecord);
    }

    @PutMapping("/detail/{id}")
    public ResponseEntity<HospitalRecordDTO> updateHospitalRecord(@PathVariable Long userId,
            @PathVariable Long petId, @PathVariable Long id,
            @RequestBody HospitalRecordDTO hospitalRecordDTO) {
        HospitalRecordDTO updatedRecord = hospitalRecordService.updateHospitalRecord(
                id, userId, petId,
                hospitalRecordDTO.visitDate(),
                hospitalRecordDTO.hospitalName(),
                hospitalRecordDTO.description()
        );
        return ResponseEntity.ok(updatedRecord);
    }

    @DeleteMapping("/detail/{id}")
    public ResponseEntity<Void> deleteHospitalRecord(@PathVariable Long userId,
            @PathVariable Long petId, @PathVariable Long id) {
        hospitalRecordService.deleteHospitalRecord(id, userId, petId);
        return ResponseEntity.noContent().build();
    }
}
