package com.example.jobs.service;

import com.example.jobs.db.entities.Interview;
import com.example.jobs.db.repositories.InterviewRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewService {

    private final InterviewRepository repo;

    public InterviewService(InterviewRepository repo) {
        this.repo = repo;
    }

    public List<Interview> findAll(Optional<Long> jobId) {
        return this.repo.findAll(new Specification<Interview>() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                if (jobId.isEmpty()) {
                    return null;
                } else {
                    return criteriaBuilder.equal(root.join("job").get("id"), jobId.get());
                }
            }
        }, Sort.by("id"));
    }

    public Optional<Interview> findById(Long id) {
        return repo.findById(id);
    }

    public Interview update(Interview interview) {
        return this.repo.save(interview);
    }

    public void delete(Interview interview) {
        this.repo.delete(interview);
    }

}
