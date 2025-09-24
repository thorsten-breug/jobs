package com.example.jobs.service;

import com.example.jobs.db.entities.Company;
import com.example.jobs.db.repositories.CompanyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository repo;

    public CompanyService(CompanyRepository repo) {
        this.repo = repo;
    }

    public Page<Company> findAllByPaginationSortedByName(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        return this.repo.findAll(pageable);
    }

    public List<Company> findAll() {
        return this.repo.findAll();
    }

    public Optional<Company> findById(Long id) {
        return repo.findById(id);
    }

    public Company update(Company company) {
        return this.repo.save(company);
    }

    public void delete(Company company) {
        this.repo.delete(company);
    }

}
