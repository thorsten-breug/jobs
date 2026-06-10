package com.example.jobs.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.OAuthFlow;
import io.swagger.v3.oas.annotations.security.OAuthFlows;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@OpenAPIDefinition(
    info = @Info(
        title = "Jobs",
        description = "Jobs REST API",
        license = @License(
            name = "Apache 2.0",
            url = "http://www.apache.org/licenses/LICENSE-2.0.html"
        ),
        version = "1.0.0"
    )
)
@SecurityScheme(
    name = "Keycloak",
    type = SecuritySchemeType.OAUTH2,
    flows = @OAuthFlows(
        authorizationCode = @OAuthFlow(
            authorizationUrl = "${springdoc.oauth2.authUrl}",
            tokenUrl = "${springdoc.oauth2.tokenUrl}"
        )
    )
)
public class OpenAPIConfig {
}
