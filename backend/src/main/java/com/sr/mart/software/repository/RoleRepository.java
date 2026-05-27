package com.sr.mart.software.repository;

import com.sr.mart.software.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository
    extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(String roleName);
}