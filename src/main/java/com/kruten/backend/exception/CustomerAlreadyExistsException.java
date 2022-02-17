package com.kruten.backend.exception;

public class CustomerAlreadyExistsException extends Exception{
    public CustomerAlreadyExistsException() {
    }

    public CustomerAlreadyExistsException(String message) {
        super(message);
    }
}
