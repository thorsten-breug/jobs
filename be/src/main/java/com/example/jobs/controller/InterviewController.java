package com.example.jobs.controller;

import com.example.jobs.db.entities.Interview;
import com.example.jobs.service.InterviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/interview")
@Tag(name = "Interview Controller", description = "Gets and modifies Interview records")
public class InterviewController {

    @Autowired
    private InterviewService service;

    @GetMapping()
    @Operation(summary = "List Interviews")
    public List<Interview> getInterviews(@Parameter(description = "Job", required = false) @RequestParam("job") Optional<Long> jobId) {
        return this.service.findAll(jobId);
    }

    @GetMapping("{id}")
    @Operation(summary = "Get Interview from Interview ID")
    public Interview getInterviewFromId(@Parameter(description = "Interview ID", required = true) @PathVariable @NotNull Long id) throws ResponseStatusException {
        Optional<Interview> interview = this.service.findById(id);
        if (interview.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return interview.get();
    }

    @PutMapping("{id}")
    @Operation(summary = "Update Interview with JSON")
    public Interview updateCompany(@PathVariable @NotNull Long id, @RequestBody Interview interview) {
        interview.setId(id);
        return this.service.update(interview);
    }

    @PostMapping()
    @Operation(summary = "Insert new Interview")
    public ResponseEntity insertInterview(@RequestBody Interview interview, HttpServletResponse response) throws IOException {
        if (interview.getId() != null) {
            return new ResponseEntity("Interview ID must not be set.", HttpStatus.BAD_REQUEST);
        }
        if (Optional.ofNullable(interview.getJob_id()).orElse(0L) <= 0L) {
            return new ResponseEntity("Job ID must be set.", HttpStatus.BAD_REQUEST);
        }
        interview = this.service.update(interview);
        response.sendRedirect(String.format("/interview/%d", interview.getId()));
        return new ResponseEntity(interview, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @Operation(summary = "Delete Interview")
    public ResponseEntity deleteInterview(@Parameter(description = "Interview ID") @PathVariable Long id) {
        Optional<Interview> interview = this.service.findById(id);
        if (interview.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            this.service.delete(interview.get());
            return new ResponseEntity(HttpStatus.OK);
        }
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String> onDataAccessError(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
