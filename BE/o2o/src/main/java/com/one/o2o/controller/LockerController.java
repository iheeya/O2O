package com.one.o2o.controller;

import com.one.o2o.dto.LockerDto;
import com.one.o2o.dto.LockerUpdateDto;
import com.one.o2o.entity.Locker;
import com.one.o2o.entity.LockerBody;
import com.one.o2o.mapper.LockerMapper;
import com.one.o2o.service.LockerService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lockers")
@AllArgsConstructor
public class LockerController {
    private final LockerService lockerService;


    @GetMapping()
    public ResponseEntity<List<LockerDto>> readLockerList(@RequestParam int locker_body_id){
        List<LockerDto> list = lockerService.readLockerByBodyId(locker_body_id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    @GetMapping("/locker")
    public ResponseEntity<LockerDto> readLocker(@RequestParam int locker_id){
        LockerDto lockerDto = lockerService.readLockerByLockerId(locker_id);
        return new ResponseEntity<>(lockerDto, HttpStatus.OK);
    }

    @PutMapping("/locker")
    public ResponseEntity<LockerDto> updateLocker(@RequestBody LockerUpdateDto lockerUpdateDto){
        LockerDto lockerDto = lockerService.updateLockerProductCount(lockerUpdateDto);
        return new ResponseEntity<>(lockerDto, HttpStatus.OK);
    }


    @GetMapping("/names")
    public ResponseEntity<List<LockerBody>> readLockerBodyList(){
        List<LockerBody> list = lockerService.readLockerBodyList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


}