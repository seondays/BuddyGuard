package buddyguard.mybuddyguard.login.exception;

import buddyguard.mybuddyguard.exception.FilterException;
import org.springframework.http.HttpStatus;

public class TokenNotFountException extends FilterException {

    public TokenNotFountException(HttpStatus httpStatus, String message) {
        super(httpStatus, message);
    }
}
