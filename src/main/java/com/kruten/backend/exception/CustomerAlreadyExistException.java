package com.kruten.backend.exception;

public class CustomerAlreadyExistException extends Exception{
    public CustomerAlreadyExistException() {
    }

    public CustomerAlreadyExistException(String message) {
        super(message);
    }
}
