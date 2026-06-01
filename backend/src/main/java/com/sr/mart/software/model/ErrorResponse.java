package com.sr.mart.software.model;

import java.time.LocalDateTime;

public record ErrorResponse(String message, int status,  LocalDateTime timestamp){
}