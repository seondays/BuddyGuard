package buddyguard.mybuddyguard.alert.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AlertService {

    //user-pet repository

    public void sendAlert(Long petId, String title, String body) {
        // pet id 로 해당 반려동물 그룹에 속해 있는 모든 user id를 찾는다.
        // 모든 user들에 대해 각각 user의 fcm토큰을 찾는다.
        // Message 객체를 빌드하고 알림을 보낸다.
    }

    public void sendAlert(String fcmToken, String title, String body) {

        Message message = Message.builder()
                .setToken(fcmToken)
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .build();

        try {
            FirebaseMessaging.getInstance().send(message);
            log.info("alert sent!!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendAlertToUsers(List<String> fcmTokens, String title, String body) {
        fcmTokens.forEach(
                token -> sendAlert(token, title, body)
        );
    }
}
