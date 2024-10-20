package buddyguard.mybuddyguard.vaccination.mapper;

import buddyguard.mybuddyguard.vaccination.controller.request.VaccinationCreateRequest;
import buddyguard.mybuddyguard.vaccination.entity.VaccinationRecord;

public class VaccinationRecordMapper {

    public static VaccinationRecord toEntity(VaccinationCreateRequest request) {
        return VaccinationRecord.builder()
                .petId(request.petId())
                .vaccinationDate(request.vaccinationDate())
                .vaccinationName(request.vaccinationName())
                .description(request.description())
                .build();
    }

}
