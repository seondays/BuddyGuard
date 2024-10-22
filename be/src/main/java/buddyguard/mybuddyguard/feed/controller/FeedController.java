package buddyguard.mybuddyguard.feed.controller;

import buddyguard.mybuddyguard.feed.controller.request.FeedRecordCreateRequest;
import buddyguard.mybuddyguard.feed.controller.response.FeedRecordResponse;
import buddyguard.mybuddyguard.feed.service.FeedService;
import buddyguard.mybuddyguard.login.dto.CustomOAuth2User;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feed/{petId}")
public class FeedController {

    private final FeedService feedService;

    @Operation(summary = "펫의 먹이 기록 전체를 조회하는 api", description = "해당 펫의 모든 먹이 기록을 조회합니다")
    @GetMapping
    public ResponseEntity<List<FeedRecordResponse>> getPetFeedRecord(
            @PathVariable("petId") Long petId,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long userId = customOAuth2User.getId();
        List<FeedRecordResponse> result = feedService.getPetFeedRecord(petId, userId);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "펫의 먹이 기록을 생성하는 api", description = "펫의 먹이 기록을 새로 등록합니다. 먹이 양의 단위는 g, ml, L, 개(count) 입니다")
    @PostMapping
    public ResponseEntity<Void> createFeedRecord(
            @PathVariable("petId") Long petId,
            @RequestBody FeedRecordCreateRequest feedRecordCreateRequest,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long userId = customOAuth2User.getId();
        feedService.save(petId, userId, feedRecordCreateRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
