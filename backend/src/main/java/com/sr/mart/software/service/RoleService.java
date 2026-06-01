package com.sr.mart.software.service;

import com.sr.mart.software.dto.CreateRoleRequest;
import com.sr.mart.software.entity.Role;
import com.sr.mart.software.enums.UserRoles;
import com.sr.mart.software.exception.RoleAlreadyExistsException;
import com.sr.mart.software.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Role createRole(CreateRoleRequest request) {
        UserRoles userRole = UserRoles.valueOf(request.roleName().toUpperCase());

        boolean roleExists = roleRepository.findByRoleName(userRole).isPresent();
        if (roleExists) {
            throw new RoleAlreadyExistsException("Role already exists");
        }

        Role role = Role.builder()
            .roleName(userRole)
            .build();

        return roleRepository.save(role);
    }
}