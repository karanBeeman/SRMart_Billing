package com.sr.mart.software.service;

import com.sr.mart.software.dto.CreateUserRequest;
import com.sr.mart.software.dto.UpdateUserRoleRequest;
import com.sr.mart.software.entity.Role;
import com.sr.mart.software.entity.User;
import com.sr.mart.software.enums.UserRoles;
import com.sr.mart.software.exception.RoleNotFoundException;
import com.sr.mart.software.exception.UserAlreadyExistsException;
import com.sr.mart.software.exception.UserNotFoundException;
import com.sr.mart.software.repository.RoleRepository;
import com.sr.mart.software.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public User createUser(CreateUserRequest request) {

        boolean userExists = userRepository.findByUsername(request.getUsername())
                .isPresent();

        if (userExists) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        Role role = roleRepository.findByRoleName(UserRoles.valueOf(request.getRoleName()))
            .orElseThrow(() -> new RoleNotFoundException("Role not found"));

        User user = User.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(role)
            .build();

        return userRepository.save(user);
    }

    public User updateUserRole(UpdateUserRoleRequest request) {
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        UserRoles userRole = UserRoles.valueOf(request.roleName().toUpperCase());

        Role role = roleRepository.findByRoleName(userRole)
                .orElseThrow(() -> new RoleNotFoundException("Role not found"));

        user.setRole(role);
        return userRepository.save(user);
    }

}
