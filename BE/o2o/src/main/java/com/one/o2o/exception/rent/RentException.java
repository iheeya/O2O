package com.one.o2o.exception.rent;

import com.one.o2o.exception.GeneralException;

public class RentException {
    public static class RentNotFoundException extends GeneralException {
        public RentNotFoundException(){
            super("대여 내역을 찾을 수 없습니다.");
        }
        public RentNotFoundException(String msg){
            super(msg);
        }
    }

    public static class InvalidReturnException extends GeneralException {
        public InvalidReturnException(){
            super("적절하지 않은 반납 시도입니다.");
        }
        public InvalidReturnException(String msg){
            super(msg);
        }
    }
}