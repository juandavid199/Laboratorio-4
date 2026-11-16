package com.almacen.it.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API REST TechInventory & CashFlow")
                        .version("1.0.0")
                        .description("API REST para la gestión de inventario de equipos de cómputo, catálogo de proveedores, alertas de rotación y seguimiento de flujo de caja para cierre mensual.")
                        .contact(new Contact()
                                .name("Laboratorio Fundamentos Sistemas de Información")
                                .email("soporte@almacenit.local"))
                        .license(new License().name("Apache 2.0")));
    }
}

