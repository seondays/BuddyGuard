package buddyguard.mybuddyguard.vaccination.service;

import buddyguard.mybuddyguard.vaccination.controller.request.VaccinationCreateRequest;
import buddyguard.mybuddyguard.vaccination.entity.VaccinationRecord;
import buddyguard.mybuddyguard.vaccination.mapper.VaccinationRecordMapper;
import buddyguard.mybuddyguard.vaccination.repository.VaccinationRecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class VaccinationRecordService {

    private final VaccinationRecordRepository vaccinationRecordRepository;

    @Transactional
    public void createVaccinationRecord(VaccinationCreateRequest request) {
        VaccinationRecord vaccinationRecord = VaccinationRecordMapper.toEntity(request);

        VaccinationRecord savedVaccinationRecord = vaccinationRecordRepository.save(vaccinationRecord);

        log.info("SAVED VACCINATION RECORD : {}", savedVaccinationRecord);
    }
}
