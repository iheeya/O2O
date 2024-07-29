package com.one.o2o.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Entity
public class Product {
    @Id
    private int productId;
    private String productNm;
    private String productImg;
    private String productDet;
    private LocalDateTime registDt;
    private int userId;

}
