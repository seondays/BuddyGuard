package buddyguard.mybuddyguard.hospital.controller.reponse;

import java.time.LocalDateTime;

public record HospitalRecordResponse(
        Long id,
        Long petId,
        LocalDateTime date,
        String category,
        String title,
        String description

) {

    @Override
    public String toString() {
        return "HospitalRecordResponse[" +
                "id=" + id +
                ", petId=" + petId +
                ", date=" + date +
                ", category: " + category +
                ", title=" + title +
                ", description=" + description +
                ']';
    }
}
