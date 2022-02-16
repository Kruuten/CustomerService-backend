package com.kruten.backend.exception;

public class CustomerAllreadyExistException extends Exception{
    public CustomerAllreadyExistException() {
    }

    public CustomerAllreadyExistException(String message) {
        super(message);
    }
}
