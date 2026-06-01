package com.sr.mart.software.model;

import com.sr.mart.software.enums.UserRoles;

public record LoginResponse(String username, UserRoles role) {
}
