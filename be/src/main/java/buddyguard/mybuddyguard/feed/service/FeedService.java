package buddyguard.mybuddyguard.feed.service;

import buddyguard.mybuddyguard.feed.aop.UserPetGroupValidation;
import buddyguard.mybuddyguard.feed.controller.request.FeedRecordCreateRequest;
import buddyguard.mybuddyguard.feed.controller.response.FeedRecordResponse;
import buddyguard.mybuddyguard.feed.entity.FeedRecord;
import buddyguard.mybuddyguard.feed.repository.FeedRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;

    @UserPetGroupValidation
    public List<FeedRecordResponse> getPetFeedRecord(Long petId, Long userId) {

        List<FeedRecord> feedRecords = feedRepository.findByPetId(petId);

        List<FeedRecordResponse> response = new ArrayList<>();
        for (FeedRecord feedRecord : feedRecords) {
            response.add(feedRecord.toDto());
        }

        return response;
    }

    @Transactional
    @UserPetGroupValidation
    public void save(Long petId, Long userId, FeedRecordCreateRequest feedRecordCreateRequest) {
        FeedRecord feedRecord = feedRecordCreateRequest.toEntity(petId);

        feedRepository.save(feedRecord);

        log.info("SAVE FEED RECORD : {}번 펫 먹이 기록 등록", feedRecord.getPetId());
    }
}
