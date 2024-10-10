package buddyguard.mybuddyguard.walk.controller;

import buddyguard.mybuddyguard.walk.controller.request.WalkRecordCreateRequest;
import buddyguard.mybuddyguard.walk.controller.request.WalkRecordUpdateRequest;
import buddyguard.mybuddyguard.walk.controller.response.WalkRecordResponse;
import buddyguard.mybuddyguard.walk.service.WalkRecordService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/walkRecords")
public class WalkRecordController {

    private final WalkRecordService walkRecordService;

    @Autowired
    public WalkRecordController(WalkRecordService walkRecordService) {
        this.walkRecordService = walkRecordService;
    }

    // 전체 산책 기록 조회
    @GetMapping("/{petId}")
    public ResponseEntity<List<WalkRecordResponse>> getAllWalkRecords(
            @PathVariable("petId") Long petId) {
        List<WalkRecordResponse> records = walkRecordService.getAllWalkRecords(petId);
        return ResponseEntity.ok(records);
    }

    // 특정 산책 기록 조회
    @GetMapping("{petId}/detail/{id}")
    public ResponseEntity<WalkRecordResponse> getWalkRecord(
            @PathVariable("petId") Long petId,
            @PathVariable("id") Long id) {
        WalkRecordResponse record = walkRecordService.getWalkRecord(id, petId);
        return ResponseEntity.ok(record);
    }

    // 산책 기록 생성
    @PostMapping
    public ResponseEntity<Void> createWalkRecord(
            @Valid @RequestBody WalkRecordCreateRequest request) {
        walkRecordService.createWalkRecord(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 주간 산책 기록 조회
    @GetMapping("/weekly/{petId}")
    public ResponseEntity<List<WalkRecordResponse>> getWeeklyRecords(
            @PathVariable("petId") Long petId,
            @RequestParam(value = "date", required = false) LocalDate requestedDate) {
        if (requestedDate == null) {
            requestedDate = LocalDate.now(); // 요청된 날짜가 없으면 오늘 날짜 사용
        }
        List<WalkRecordResponse> records = walkRecordService.getWeeklyRecords(petId, requestedDate);
        return ResponseEntity.ok(records);
    }

    // 월간 산책 기록 조회
    @GetMapping("/monthly/{petId}")
    public ResponseEntity<List<WalkRecordResponse>> getMonthlyRecords(
            @PathVariable("petId") Long petId,
            @RequestParam(value = "date", required = false) LocalDate requestedDate) {
        if (requestedDate == null) {
            requestedDate = LocalDate.now(); // 요청된 날짜가 없으면 오늘 날짜 사용
        }
        List<WalkRecordResponse> records = walkRecordService.getMonthlyRecords(petId, requestedDate);
        return ResponseEntity.ok(records);
    }

    // 산책 기록 업데이트
    @PutMapping("{petId}/detail/{id}")
    public ResponseEntity<Void> updateWalkRecord(
            @PathVariable("petId") Long petId,
            @PathVariable("id") Long id,
            @Valid @RequestBody WalkRecordUpdateRequest request) {

        walkRecordService.updateWalkRecord(id, petId, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 산책 기록 삭제
    @DeleteMapping("{petId}/detail/{id}")
    public ResponseEntity<Void> deleteWalkRecord(
            @PathVariable("petId") Long petId,
            @PathVariable("id") Long id) {

        walkRecordService.deleteWalkRecord(id, petId);
        return ResponseEntity.noContent().build();
    }
}
