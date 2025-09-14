package com.example.jobs.db.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Schema(name = "Job")
@Entity
@Table(name="job")
public class Job {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(defaultValue = "0")
    protected Long id;

    @Schema(defaultValue = "0")
    protected Long company_id;

    protected String title;

    protected String remarks;

    @Schema(defaultValue = "false")
    protected Boolean closed;
}
