package buddyguard.mybuddyguard.invitation.utils;

import java.time.Duration;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class SecondConverter {

    public static Long stringToLong(String expirationString) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM dd HH:mm:ss z yyyy",
                Locale.ENGLISH);

        ZonedDateTime expirationDate = ZonedDateTime.parse(expirationString, formatter);

        ZonedDateTime now = ZonedDateTime.now(expirationDate.getZone());

        long leftSeconds = Duration.between(now, expirationDate).getSeconds();
        return Math.max(leftSeconds, 0);
    }
}
