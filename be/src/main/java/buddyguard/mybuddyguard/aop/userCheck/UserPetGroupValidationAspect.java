package buddyguard.mybuddyguard.aop.userCheck;

import buddyguard.mybuddyguard.exception.PetNotFoundException;
import buddyguard.mybuddyguard.exception.UserInformationNotFoundException;
import buddyguard.mybuddyguard.exception.UserPetGroupException;
import buddyguard.mybuddyguard.login.dto.CustomOAuth2User;
import buddyguard.mybuddyguard.login.repository.UserRepository;
import buddyguard.mybuddyguard.pet.repository.PetRepository;
import buddyguard.mybuddyguard.pet.repository.UserPetRepository;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class UserPetGroupValidationAspect {

    private final UserPetRepository userPetRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    @Before("@annotation(buddyguard.mybuddyguard.aop.userCheck.UserPetGroupValidation)")
    public void checkUserPetConnection(JoinPoint joinPoint) {
        // 파라미터의 순서를 맞춰줘야 하는 문제점 존재..
        Long petId = (Long) joinPoint.getArgs()[0];
        Long userId = Objects.requireNonNull(getLoginUserId());

        if (!petRepository.existsById(petId)) {
            throw new PetNotFoundException();
        }
        if (!userRepository.existsById(userId)) {
            throw new UserInformationNotFoundException();
        }
        if (!userPetRepository.existsByUserIdAndPetId(userId, petId)) {
            throw new UserPetGroupException();
        }
    }

    private Long getLoginUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return ((CustomOAuth2User) authentication.getPrincipal()).getId();
        }
        return null;
    }
}
