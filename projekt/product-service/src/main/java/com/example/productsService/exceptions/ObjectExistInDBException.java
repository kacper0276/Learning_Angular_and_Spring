package com.example.productsService.exceptions;

public class ObjectExistInDBException extends RuntimeException{
    public ObjectExistInDBException() {
    }

    public ObjectExistInDBException(String message) {
        super(message);
    }

    public ObjectExistInDBException(String message, Throwable cause) {
        super(message, cause);
    }

    public ObjectExistInDBException(Throwable cause) {
        super(cause);
    }
}
