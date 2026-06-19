package com.example.jobs.service;

import com.example.jobs.db.entities.Interview;
import com.example.jobs.db.repositories.InterviewRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewService {

    @Autowired
    private InterviewRepository repo;

    @Autowired
    private JobService jobService;

    public List<Interview> findAll(Optional<Long> jobId) {
        return this.repo.findAll(new Specification<Interview>() {
            @Override
            public Predicate toPredicate(@NonNull Root root, CriteriaQuery query, @NonNull CriteriaBuilder criteriaBuilder) {
                return jobId.map(aLong -> criteriaBuilder.equal(root.join("job").get("id"), aLong)).orElse(null);
            }
        }, Sort.by("id"));
    }

    public Optional<Interview> findById(Long id) {
        return repo.findById(id);
    }

    public Interview update(Interview interview) {
        interview = this.repo.save(interview);
        if (interview.getJob() == null && interview.getJob_id() != 0L) {
            interview.setJob(this.jobService.findById(interview.getJob_id()).orElse(null));
        }
        return interview;
    }

    public void delete(Interview interview) {
        this.repo.delete(interview);
    }

}
