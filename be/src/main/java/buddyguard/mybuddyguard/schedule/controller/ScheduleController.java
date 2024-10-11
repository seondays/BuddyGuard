package buddyguard.mybuddyguard.schedule.controller;

import buddyguard.mybuddyguard.schedule.controller.response.ScheduleMonthlyResponse;
import buddyguard.mybuddyguard.schedule.service.ScheduleService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/schedule/{petId}/{year}/{month}")
    public ResponseEntity<ScheduleMonthlyResponse> getMonthlySchedule(
            @PathVariable("petId") Long petId,
            @PathVariable("year") int year, @PathVariable("month") int month,
            HttpServletRequest request) {
        ScheduleMonthlyResponse response = scheduleService.getMonthly(petId, year, month, request);
        return ResponseEntity.ok(response);
    }
}
