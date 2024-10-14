package buddyguard.mybuddyguard.jwt.utils;

public class TokenPreprocessor {

    public static String deletePrefixToken(String token) {
        if (token == null) {
            return null;
        }
        if (token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return null;
    }
}
