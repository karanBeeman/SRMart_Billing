package com.sr.mart.software.service;

import com.sr.mart.software.dto.CreateRoleRequest;
import com.sr.mart.software.entity.Role;
import com.sr.mart.software.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Role createRole(CreateRoleRequest request) {

        boolean roleExists = roleRepository.findByRoleName(request.getRoleName()).isPresent();

        if (roleExists) {
            throw new RuntimeException("Role already exists");
        }

        Role role = Role.builder()
            .roleName(request.getRoleName())
            .build();

        return roleRepository.save(role);
    }
}