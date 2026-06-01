package com.sr.mart.software.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateUserRoleRequest(
    @NotBlank(message = "Role name is required")
    String roleName,

    @NotBlank(message = "Username is required")
    String username
) {
}
