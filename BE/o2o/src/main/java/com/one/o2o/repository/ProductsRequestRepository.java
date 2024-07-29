package com.one.o2o.repository;

import com.one.o2o.entity.products.request.ProductsRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductsRequestRepository extends JpaRepository<ProductsRequest, Integer> {}
