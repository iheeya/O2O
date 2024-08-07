package com.one.o2o.service;

import com.one.o2o.dto.EmpCard.EmpCardRequestDto;
import com.one.o2o.dto.EmpCard.UserDto;
import com.one.o2o.dto.MemberDto;

public interface EmpService {
    // 이름과 사번(선택), 이미지(선택) 받아서 비교
    public UserDto findUserByEmpCard(EmpCardRequestDto empCardRequestDto);
}
