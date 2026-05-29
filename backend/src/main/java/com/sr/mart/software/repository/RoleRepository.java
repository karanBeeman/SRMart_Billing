package com.sr.mart.software.repository;

import com.sr.mart.software.entity.Role;
import com.sr.mart.software.enums.UserRoles;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(UserRoles roleName);
}