package buddyguard.mybuddyguard.weight.exception;

import buddyguard.mybuddyguard.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class UserInformationNotFoundException extends BusinessException {

    public UserInformationNotFoundException() {
        super(HttpStatus.NOT_FOUND, "관련된 유저의 정보가 존재하지 않습니다.");
    }
}
