package buddyguard.mybuddyguard.weight.exception;

import buddyguard.mybuddyguard.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class InvalidPetRegisterException extends BusinessException {

    public InvalidPetRegisterException() {
        super(HttpStatus.BAD_REQUEST, "펫을 등록할 수 없습니다.");
    }
}
