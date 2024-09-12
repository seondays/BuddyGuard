package buddyguard.mybuddyguard.hospital.mapper;

import buddyguard.mybuddyguard.hospital.controller.reponse.HospitalRecordResponse;
import buddyguard.mybuddyguard.hospital.entity.HospitalRecord;

public class HospitalRecordMapper {

    public static HospitalRecordResponse toResponse(HospitalRecord hospitalRecord) {
        return new HospitalRecordResponse(
                hospitalRecord.getId(),
                hospitalRecord.getUserId(),
                hospitalRecord.getPetId(),
                hospitalRecord.getVisitDate(),
                hospitalRecord.getHospitalName(),
                hospitalRecord.getDescription()
        );
    }

    public static HospitalRecord toEntity(HospitalRecordResponse hospitalRecordDTO) {
        return new HospitalRecord(
                hospitalRecordDTO.id(),
                hospitalRecordDTO.userId(),
                hospitalRecordDTO.petId(),
                hospitalRecordDTO.visitDate(),
                hospitalRecordDTO.hospitalName(),
                hospitalRecordDTO.description()
        );
    }
}
