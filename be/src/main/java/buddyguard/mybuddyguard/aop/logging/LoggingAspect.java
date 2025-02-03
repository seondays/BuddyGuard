package buddyguard.mybuddyguard.aop.logging;

import buddyguard.mybuddyguard.login.dto.CustomOAuth2User;
import java.lang.reflect.Parameter;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    @AfterReturning("execution(* buddyguard.mybuddyguard..*.create*(..)) && @annotation(org.springframework.transaction.annotation.Transactional)")
    public void logCreateMethod(JoinPoint joinPoint) {
        logAfterTransaction(joinPoint, "저장");
    }

    @AfterReturning("execution(* buddyguard.mybuddyguard..*.delete*(..)) && @annotation(org.springframework.transaction.annotation.Transactional)")
    public void logDeleteMethod(JoinPoint joinPoint) {
        logAfterTransaction(joinPoint, "삭제");
    }

    @AfterReturning("execution(* buddyguard.mybuddyguard..*.update*(..)) && @annotation(org.springframework.transaction.annotation.Transactional)")
    public void logUpdateMethod(JoinPoint joinPoint) {
        logAfterTransaction(joinPoint, "업데이트");
    }

    public void logAfterTransaction(JoinPoint joinPoint, String message) {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        String className = joinPoint.getTarget().getClass().getName();

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Parameter[] parameters = methodSignature.getMethod().getParameters();

        Long petId = null;

        for (int i = 0; i < parameters.length; i++) {
            if ("petId".equals(parameters[i].getName())) {
                petId = (Long) args[i];
                break;
            }
        }

        Long finalPetId = petId;
        Long finalUserId = Objects.requireNonNull(getLoginUserId());
        TransactionSynchronizationManager.registerSynchronization(
                new TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        log.info(
                                "========== [{}] 클래스의 [{}] 메서드 실행 결과로, [userId : {}]이 [petId : {}]의 기록 {} 작업 완료 ==========",
                                className, methodName, finalUserId, finalPetId, message);
                    }
                }
        );
    }

    /**
     * 현재 로그인한 사용자 Id 가져오기
     *
     * @return
     */
    private Long getLoginUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return ((CustomOAuth2User) authentication.getPrincipal()).getId();
        }
        return null;
    }
}
