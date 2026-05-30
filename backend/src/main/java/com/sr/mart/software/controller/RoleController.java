package com.sr.mart.software.controller;

import com.sr.mart.software.dto.CreateRoleRequest;
import com.sr.mart.software.entity.Role;
import com.sr.mart.software.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping("/role/create")
    public ResponseEntity<Role> createRole(@RequestBody CreateRoleRequest request) {
        Role res = roleService.createRole(request);
        return ResponseEntity.ok(res);
    }
}
