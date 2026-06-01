package com.sr.mart.software.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateUserRequest(
    @NotBlank(message = "Username is required")
    String username,

    @NotBlank(message = "Password  is required")
    String password,

    @NotBlank(message = "Role name is required")
    String roleName
) {
}