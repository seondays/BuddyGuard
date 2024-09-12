package buddyguard.mybuddyguard.hospital.exception;

import buddyguard.mybuddyguard.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class RecordNotFoundException extends BusinessException {

    public RecordNotFoundException() {
        super(HttpStatus.NOT_FOUND, "해당 기록은 존재하지 않습니다.");
    }
}
