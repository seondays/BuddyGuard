package buddyguard.mybuddyguard.walk.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.List;
import java.util.Map;

@Converter
public class JsonArrayConverter implements AttributeConverter<Object, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // List<String> 또는 List<Map<String, Double>>을 JSON 문자열로 변환
    @Override
    public String convertToDatabaseColumn(Object attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting list to JSON", e);
        }
    }

    // JSON 문자열을 적절한 타입으로 변환 (List<String> 또는 List<Map<String, Double>>)
    @Override
    public Object convertToEntityAttribute(String dbData) {
        try {
            // path는 객체 배열이므로 따로 처리
            if (dbData.startsWith("[{")) {
                return objectMapper.readValue(dbData, new TypeReference<List<Map<String, Double>>>() {});
            } else {
                // buddy_ids나 center_position은 List<String>으로 처리
                return objectMapper.readValue(dbData, new TypeReference<List<String>>() {});
            }
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting JSON to list", e);
        }
    }
}
