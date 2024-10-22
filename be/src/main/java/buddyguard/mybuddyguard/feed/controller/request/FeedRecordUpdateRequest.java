package buddyguard.mybuddyguard.feed.controller.request;

import buddyguard.mybuddyguard.feed.utils.AmountType;
import buddyguard.mybuddyguard.feed.utils.FeedType;
import java.time.LocalDateTime;

public record FeedRecordUpdateRequest(
        LocalDateTime date,
        Long amount,
        AmountType amountType,
        FeedType feedType
) {

}
