package com.example.jobs.db.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Schema(name = "Company")
@Entity
@Table(name="company")
public class Company {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(defaultValue = "0")
    protected Long id;

    protected String name;

    protected String city;

    protected String street;

    protected String zip;

    protected String contact;
}
