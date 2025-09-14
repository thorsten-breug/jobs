package com.example.jobs.controller;

import com.example.jobs.db.entities.Company;
import com.example.jobs.service.CompanyService;
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
@RequestMapping("/company")
@Tag(name = "Company Controller", description = "Gets and modifies Company records")
public class CompanyController {

    private final CompanyService service;

    public CompanyController(CompanyService service) {
        this.service = service;
    }

    @GetMapping()
    @Operation(summary = "List Companies")
    public List<Company> getCompanies() {
        return this.service.findAll();
    }

    @GetMapping("{id}")
    @Operation(summary = "Get Company from ID")
    public Company getCompanyFromId(@Parameter(description = "Company ID", required = true) @PathVariable @NotNull Long id) {
        Optional<Company> company = this.service.findById(id);
        if (company.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return company.get();
    }

    @PutMapping("{id}")
    @Operation(summary = "Update Company with JSON")
    public Company updateCompany(@PathVariable @NotNull Long id, @RequestBody Company company) {
        company.setId(id);
        return this.service.update(company);
    }

    @PostMapping()
    @Operation(summary = "Insert new Company")
    public ResponseEntity insertCompany(@RequestBody Company company, HttpServletResponse response) throws IOException {
        if (company.getId() != null) {
            return new ResponseEntity("Company ID must not be set.", HttpStatus.BAD_REQUEST);
        }
        company = this.service.update(company);
        response.sendRedirect(String.format("/company/%d", company.getId()));
        return new ResponseEntity(company, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @Operation(summary = "Delete Company")
    public ResponseEntity deleteCompany(@Parameter(description = "Company ID") @PathVariable Long id) {
        Optional<Company> company = this.service.findById(id);
        if (company.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            this.service.delete(company.get());
            return new ResponseEntity(HttpStatus.OK);
        }
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String> onDataAccessError(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
