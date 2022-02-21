package com.kruten.backend.exception;

public class CustomerNotFoundException extends NullPointerException{
    public CustomerNotFoundException() {
    }

    public CustomerNotFoundException(String message){
        super(message);
    }

}
