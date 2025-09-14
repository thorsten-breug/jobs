package com.example.jobs.db.entities;

import com.fasterxml.jackson.annotation.*;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Schema(name = "Interview")
@Entity
@Table(name="interview")
public class Interview {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(defaultValue = "0")
    protected Long id;

    protected String url;

    protected String remarks;

    protected Timestamp date;

    @Schema(defaultValue = "0")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    protected Long job_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "job_id", updatable = false, insertable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    protected Job job;

}
