package buddyguard.mybuddyguard.login.controller;

import buddyguard.mybuddyguard.login.controller.response.UserInformationResponse;
import buddyguard.mybuddyguard.login.dto.CustomOAuth2User;
import buddyguard.mybuddyguard.login.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<UserInformationResponse> getUserInformation(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
        Long userId = customOAuth2User.getId();
        UserInformationResponse result = userService.getUserInformation(userId);
        return ResponseEntity.ok(result);
    }
}
