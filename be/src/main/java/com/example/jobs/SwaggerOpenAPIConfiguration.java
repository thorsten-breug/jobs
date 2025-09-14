package com.example.jobs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerOpenAPIConfiguration {

    @Bean
    public OpenAPI apiEndPointsInfo() {
        return new OpenAPI().info(new Info()
            .title("Jobs")
            .description("Jobs REST API")
            .license(new License().name("Apache 2.0").url("http://www.apache.org/licenses/LICENSE-2.0.html"))
            .version("1.0.0")
        );
    }

}
