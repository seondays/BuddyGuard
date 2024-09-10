package buddyguard.mybuddyguard.login.dto;

import buddyguard.mybuddyguard.login.controller.request.OAuth2Request;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class CustomOAuth2User implements OAuth2User {
    private final OAuth2Request oAuth2Request;
    private final String role;
    private final Long id;

    public CustomOAuth2User(OAuth2Request oAuth2Request, String role, Long id) {
        this.oAuth2Request = oAuth2Request;
        this.role = role;
        this.id = id;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return role;
            }
        });
        return collection;
    }

    @Override
    public String getName() {
        return oAuth2Request.getName();
    }

    public Long getId() {
        return id;
    }
}
