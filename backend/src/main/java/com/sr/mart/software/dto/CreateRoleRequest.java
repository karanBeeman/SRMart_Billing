package com.sr.mart.software.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateRoleRequest(
    @NotBlank(message = "Role name is required")
    String roleName
) {
}