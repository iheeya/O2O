package com.one.o2o.exception;

import com.one.o2o.dto.common.Response;
import com.one.o2o.exception.locker.LockerException;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(annotations = RestController.class)
@Slf4j
public class ErrorHandler {
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Response> badRequestError(BadRequestException e){
        log.error("ErrorHandler.badRequestError");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Response.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .build());
    }

    @ExceptionHandler(LockerException.LockerNotFoundException.class)
    public ResponseEntity<Response> LockerNotFoundException(LockerException.LockerNotFoundException e){
        log.error("ErrorHandler.LockerNotFoundException");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Response.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .build());
    }

    @ExceptionHandler(GeneralException.class)
    public ResponseEntity<Response> GeneralException(RuntimeException e){
        log.error("ErrorHandler.GeneralException");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Response.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .build());
    }
}