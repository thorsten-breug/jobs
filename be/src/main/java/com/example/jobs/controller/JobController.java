package com.example.jobs.controller;

import com.example.jobs.db.entities.Job;
import com.example.jobs.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/job")
@Tag(name = "Job Controller", description = "Gets and modifies Job records")
public class JobController {

    private final JobService service;

    public JobController(JobService service) {
        this.service = service;
    }

    @GetMapping()
    @Operation(summary = "List Jobs")
    public List<Job> getJobs(@Parameter(description = "Company", required = false) @RequestParam("company") Optional<Long> companyId, @Parameter(description = "Status", required = false) @RequestParam("closed") Optional<Boolean> closed) {
        return this.service.findAll(companyId, closed);
    }

    @GetMapping("{id}")
    @Operation(summary = "Get Job from Job ID")
    public Job getJobFromId(@Parameter(description = "Job ID", required = true) @PathVariable @NotNull Long id) throws ResponseStatusException {
        Optional<Job> job = this.service.findById(id);
        if (job.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return job.get();
    }

    @PutMapping("{id}")
    @Operation(summary = "Update Job with JSON")
    public Job updateCompany(@PathVariable @NotNull Long id, @RequestBody Job job) {
        job.setId(id);
        return this.service.update(job);
    }

    @PostMapping()
    @Operation(summary = "Insert new Job")
    public ResponseEntity insertJob(@RequestBody Job job, HttpServletResponse response) throws IOException {
        if (job.getId() != null) {
            return new ResponseEntity("Job ID must not be set.", HttpStatus.BAD_REQUEST);
        }
        if (Optional.ofNullable(job.getCompany_id()).orElse(0L) <= 0L) {
            return new ResponseEntity("Company ID must be set.", HttpStatus.BAD_REQUEST);
        }
        job = this.service.update(job);
        response.sendRedirect(String.format("/job/%d", job.getId()));
        return new ResponseEntity(job, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @Operation(summary = "Delete Job")
    public ResponseEntity deleteJob(@Parameter(description = "Job ID") @PathVariable Long id) {
        Optional<Job> job = this.service.findById(id);
        if (job.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            this.service.delete(job.get());
            return new ResponseEntity(HttpStatus.OK);
        }
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String> onDataAccessError(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
