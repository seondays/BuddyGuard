package buddyguard.mybuddyguard.hospital.mapper;

import buddyguard.mybuddyguard.hospital.dto.HospitalRecordDTO;
import buddyguard.mybuddyguard.hospital.entity.HospitalRecord;

public class HospitalRecordMapper {

    public static HospitalRecordDTO toDTO(HospitalRecord hospitalRecord) {
        return new HospitalRecordDTO(
                hospitalRecord.getId(),
                hospitalRecord.getUserId(),
                hospitalRecord.getPetId(),
                hospitalRecord.getVisitDate(),
                hospitalRecord.getHospitalName(),
                hospitalRecord.getDescription()
        );
    }

    public static HospitalRecord toEntity(HospitalRecordDTO hospitalRecordDTO) {
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
