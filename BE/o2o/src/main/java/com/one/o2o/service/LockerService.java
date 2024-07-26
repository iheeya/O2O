package com.one.o2o.service;

import com.one.o2o.dto.LockerDto;
import com.one.o2o.dto.LockerUpdateDto;
import com.one.o2o.entity.Locker;
import com.one.o2o.entity.LockerBody;
import com.one.o2o.exception.LockerException;
import com.one.o2o.mapper.LockerMapper;
import com.one.o2o.repository.LockerBodyRepository;
import com.one.o2o.repository.LockerRepository;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

interface LockerServiceInterface {
    // 본체 목록 조회
    public List<LockerBody> readLockerBodyList();
    // 본체 별 현황 조회
    public List<LockerDto> readLockerByBodyId(int body_id);
    // 사물함 칸 별 현황 조회
    public LockerDto readLockerByLockerId(int locker_id);
    // 사물함 상태 변경
    public LockerDto updateLockerProductCount(LockerUpdateDto lockerUpdateDto);
}

@Service
@AllArgsConstructor
public class LockerService implements LockerServiceInterface{
    private final LockerBodyRepository lockerBodyRepository;
    private final LockerRepository lockerRepository;
    private final LockerMapper lockerMapper;


    @Override
    public List<LockerBody> readLockerBodyList() {
        return lockerBodyRepository.findAll();
    }

    public List<LockerDto> readLockerByBodyId(int body_id) {
        List<Locker> list = lockerRepository.findByBodyId(body_id);
        list.forEach(locker -> Hibernate.initialize(locker.getProduct()));
        return lockerMapper.lockersToLockerDtoList(list);
    }

    public LockerDto readLockerByLockerId(int locker_id) {
        Locker locker=lockerRepository.findByLockerId(locker_id).orElseThrow();
        return lockerMapper.lockerToLockerDto(locker);
    }

    @Override
    @Transactional
    public LockerDto updateLockerProductCount(LockerUpdateDto lockerUpdateDto) {
        Optional<Locker> findLocker = lockerRepository.findByLockerId(lockerUpdateDto.getLocker_id());
        Locker locker = findLocker.orElseThrow(LockerException.LockerNotFoundException::new);
        locker.updateTotal_cnt(lockerUpdateDto.getTotal_cnt());
        locker.updateProduct_cnt(lockerUpdateDto.getProduct_cnt());
        return lockerMapper.lockerToLockerDto(locker);
    }


}