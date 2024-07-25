package com.one.o2o.repository;

import com.one.o2o.entity.productsrequest.ProductsRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductsRequestRepository extends JpaRepository<ProductsRequest, Integer> {}
