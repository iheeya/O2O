package com.one.o2o.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="reserve")
@Getter
@Setter
@ToString
@DynamicUpdate
public class Reserve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reserveId;
    private Integer userId;
    private LocalDateTime startDt;
    private LocalDateTime dueDt;
    private boolean isEnded;
    private LocalDateTime endDt;
    private boolean isCanceled;
    private boolean isTaken;
    private Integer rentId;
    private Integer bodyId;


    @OneToMany(mappedBy = "reserveId", fetch = FetchType.LAZY)
    @Column(insertable = false, updatable = false)
    private List<ReserveDet> reserveDetList;

    public void updateIsEndedToTrue(LocalDateTime endDt){
        System.out.println("updateIsEndedToTrue");
        this.isEnded = true;
        this.endDt = endDt;
    }
}