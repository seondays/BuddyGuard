package buddyguard.mybuddyguard.jwt.controller;

import buddyguard.mybuddyguard.jwt.service.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {
    private final TokenService service;

    public TokenController(TokenService service) {
        this.service = service;
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        String newAccess = service.reissueAccessToken(cookies);
        response.setHeader("Authorization", newAccess);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
