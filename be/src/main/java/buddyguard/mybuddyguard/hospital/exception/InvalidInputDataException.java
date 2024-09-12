package buddyguard.mybuddyguard.hospital.exception;

import buddyguard.mybuddyguard.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class InvalidInputDataException extends BusinessException {

    public InvalidInputDataException() {
        super(HttpStatus.BAD_REQUEST, "잘못된 입력 입니다.");
    }
}
