package com.svs.svs.advice;

import com.svs.svs.exception.Exception401;
import com.svs.svs.exception.Exception403;
import com.svs.svs.exception.Exception404;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception401.class)
    public ResponseEntity<String> handleException401(Exception401 ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(Exception403.class)
    public ResponseEntity<String> handleException403(Exception403 ex) {
        return ResponseEntity.status(HttpStatus.valueOf(403)).body(ex.getMessage());
    }

    @ExceptionHandler(Exception404.class)
    public ResponseEntity<String> handleException404(Exception404 ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
