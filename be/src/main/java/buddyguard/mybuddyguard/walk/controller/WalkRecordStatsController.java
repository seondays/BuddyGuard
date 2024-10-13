package buddyguard.mybuddyguard.walk.controller;

import buddyguard.mybuddyguard.walk.controller.response.WalkStatsWithRecordsResponse;
import buddyguard.mybuddyguard.walk.service.WalkRecordStatsService;
import java.time.LocalDate;
import java.time.YearMonth;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/walkRecords")
public class WalkRecordStatsController {

    private final WalkRecordStatsService walkRecordStatsService;

    @GetMapping("/{petId}/weekly")
    public ResponseEntity<WalkStatsWithRecordsResponse> getWeeklyRecords(
            @PathVariable("petId") Long petId,
            @RequestParam(value = "date", required = false) LocalDate requestedDate) {
        if (requestedDate == null) {
            requestedDate = LocalDate.now();
        }
        WalkStatsWithRecordsResponse records = walkRecordStatsService.getWeeklyRecords(petId, requestedDate);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/{petId}/monthly/{month}")
    public ResponseEntity<WalkStatsWithRecordsResponse> getMonthlyRecords(
            @PathVariable("petId") Long petId,
            @PathVariable("month") int month,
            @RequestParam(value = "year", required = false) Integer year) {
        if (year == null) {
            year = LocalDate.now().getYear();
        }
        LocalDate requestedDate = YearMonth.of(year, month).atDay(1);
        WalkStatsWithRecordsResponse records = walkRecordStatsService.getMonthlyRecords(petId, requestedDate);
        return ResponseEntity.ok(records);
    }
}
