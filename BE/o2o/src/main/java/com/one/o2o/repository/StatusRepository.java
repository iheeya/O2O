package com.one.o2o.repository;

import com.one.o2o.entity.Locker;
import com.one.o2o.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusRepository  extends JpaRepository<Status, Integer> {
    Optional<Status> findAllByStatusId(Integer statusId);
}
