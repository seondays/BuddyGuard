package buddyguard.mybuddyguard.feed.service;

import buddyguard.mybuddyguard.exception.RecordNotFoundException;
import buddyguard.mybuddyguard.aop.userCheck.UserPetGroupValidation;
import buddyguard.mybuddyguard.feed.controller.request.FeedRecordCreateRequest;
import buddyguard.mybuddyguard.feed.controller.request.FeedRecordUpdateRequest;
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
    public List<FeedRecordResponse> getPetFeedRecord(Long petId) {

        List<FeedRecord> feedRecords = feedRepository.findByPetId(petId);

        List<FeedRecordResponse> response = new ArrayList<>();
        for (FeedRecord feedRecord : feedRecords) {
            response.add(feedRecord.toDto());
        }

        return response;
    }

    @Transactional
    @UserPetGroupValidation
    public void create(Long petId, FeedRecordCreateRequest feedRecordCreateRequest) {
        FeedRecord feedRecord = feedRecordCreateRequest.toEntity(petId);

        feedRepository.save(feedRecord);
    }

    @Transactional
    @UserPetGroupValidation
    public void delete(Long petId, Long feedId) {
        FeedRecord feedRecord = feedRepository.findById(feedId)
                .orElseThrow(RecordNotFoundException::new);

        feedRepository.delete(feedRecord);
    }

    @Transactional
    @UserPetGroupValidation
    public void update(Long petId, Long feedId, FeedRecordUpdateRequest feedRecordUpdateRequest) {
        FeedRecord feedRecord = feedRepository.findById(feedId)
                .orElseThrow(RecordNotFoundException::new);

        feedRecord.update(feedRecordUpdateRequest.amount(), feedRecordUpdateRequest.amountType(),
                feedRecordUpdateRequest.feedType(), feedRecordUpdateRequest.date());

        feedRepository.save(feedRecord);
    }
}
