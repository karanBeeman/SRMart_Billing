package com.sr.mart.software.service;

import com.sr.mart.software.dto.CreateRoleRequest;
import com.sr.mart.software.dto.UpdateRoleRequest;
import com.sr.mart.software.entity.Role;
import com.sr.mart.software.enums.UserRoles;
import com.sr.mart.software.exception.RoleAlreadyExistsException;
import com.sr.mart.software.exception.RoleNotFoundException;
import com.sr.mart.software.exception.UserNotFoundException;
import com.sr.mart.software.repository.RoleRepository;
import com.sr.mart.software.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public Role createRole(CreateRoleRequest request) {
        UserRoles userRole = UserRoles.valueOf(request.getRoleName().toUpperCase());

        boolean roleExists = roleRepository.findByRoleName(userRole).isPresent();
        if (roleExists) {
            throw new RoleAlreadyExistsException("Role already exists");
        }

        Role role = Role.builder()
            .roleName(userRole)
            .build();

        return roleRepository.save(role);
    }

    public Role updateRole(UpdateRoleRequest request) {
        userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new UserNotFoundException("User not found"));

        UserRoles userRole = UserRoles.valueOf(request.getRoleName().toUpperCase());
        Role role = roleRepository.findByRoleName(userRole)
            .orElseThrow(() -> new RoleNotFoundException("Role not found"));

        role.setRoleName(userRole);
        return roleRepository.save(role);
    }
}