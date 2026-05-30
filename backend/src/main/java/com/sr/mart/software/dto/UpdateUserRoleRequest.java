package com.sr.mart.software.dto;


import lombok.Data;

@Data
public class UpdateUserRoleRequest {

    private String roleName;
    private String username;
}
