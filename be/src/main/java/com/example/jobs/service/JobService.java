package com.example.jobs.service;

import com.example.jobs.db.entities.Job;
import com.example.jobs.db.repositories.JobRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository repo;

    public JobService(JobRepository repo) {
        this.repo = repo;
    }

    public List<Job> findAll(Optional<Long> companyId, Optional<Boolean> closed) {
        return this.repo.findAll(new Specification<Job>() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<>();
                if (companyId.isPresent()) {
                    predicates.add(criteriaBuilder.equal(root.get("company_id"), companyId.get()));
                }
                if (closed.isPresent()) {
                    predicates.add(criteriaBuilder.equal(root.get("closed"), closed.get()));
                }
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }
        }, Sort.by("id"));
    }

    public Optional<Job> findById(Long id) {
        return repo.findById(id);
    }

    public Job update(Job job) {
        return this.repo.save(job);
    }

    public void delete(Job job) {
        this.repo.delete(job);
    }

}
