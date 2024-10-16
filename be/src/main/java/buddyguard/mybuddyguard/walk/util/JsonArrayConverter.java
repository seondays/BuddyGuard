package buddyguard.mybuddyguard.walk.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.List;

@Converter
public class JsonArrayConverter implements AttributeConverter<Object, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // List<String>을 JSON 문자열로 변환
    public String convertListStringToJson(List<String> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting list of strings to JSON", e);
        }
    }

    // List<Integer>를 JSON 문자열로 변환
    public String convertListIntegerToJson(List<Integer> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting list of integers to JSON", e);
        }
    }

    // List<Double>을 JSON 문자열로 변환
    public String convertListDoubleToJson(List<Double> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting list of doubles to JSON", e);
        }
    }

    // JSON 문자열을 List<String>으로 변환
    public List<String> convertJsonToListString(String dbData) {
        try {
            return objectMapper.readValue(dbData, objectMapper.getTypeFactory().constructCollectionType(List.class, String.class));
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting JSON to list of strings", e);
        }
    }

    // JSON 문자열을 List<Integer>로 변환
    public List<Integer> convertJsonToListInteger(String dbData) {
        try {
            return objectMapper.readValue(dbData, objectMapper.getTypeFactory().constructCollectionType(List.class, Integer.class));
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting JSON to list of integers", e);
        }
    }

    // JSON 문자열을 List<Double>로 변환
    public List<Double> convertJsonToListDouble(String dbData) {
        try {
            return objectMapper.readValue(dbData, objectMapper.getTypeFactory().constructCollectionType(List.class, Double.class));
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting JSON to list of doubles", e);
        }
    }

    @Override
    public String convertToDatabaseColumn(Object attribute) {
        if (attribute instanceof List) {
            if (!((List<?>) attribute).isEmpty()) {
                Object firstElement = ((List<?>) attribute).get(0);
                if (firstElement instanceof String) {
                    return convertListStringToJson((List<String>) attribute);
                } else if (firstElement instanceof Integer) {
                    return convertListIntegerToJson((List<Integer>) attribute);
                } else if (firstElement instanceof Double) {
                    return convertListDoubleToJson((List<Double>) attribute);
                }
            }
        }
        throw new IllegalArgumentException("Unsupported attribute type");
    }

    @Override
    public Object convertToEntityAttribute(String dbData) {
        if (dbData.startsWith("[")) {
            try {
                // 시도할 순서를 정해서 먼저 String으로 시도, 그 후 다른 타입으로 변환
                return convertJsonToListString(dbData);
            } catch (Exception e1) {
                try {
                    return convertJsonToListInteger(dbData);
                } catch (Exception e2) {
                    return convertJsonToListDouble(dbData);
                }
            }
        }
        throw new IllegalArgumentException("Unsupported JSON format");
    }
}
