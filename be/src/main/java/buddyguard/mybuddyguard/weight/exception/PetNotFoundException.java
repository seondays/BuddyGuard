package buddyguard.mybuddyguard.weight.exception;

import buddyguard.mybuddyguard.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class PetNotFoundException extends BusinessException {

    public PetNotFoundException() {
        super(HttpStatus.NOT_FOUND, "관련된 펫의 정보가 존재하지 않습니다.");
    }
}

