package com.sr.mart.software.controller;

import com.sr.mart.software.dto.CreateUserRequest;
import com.sr.mart.software.dto.UpdateUserRoleRequest;
import com.sr.mart.software.entity.User;
import com.sr.mart.software.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/user/create")
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest request) {
        User res = userService.createUser(request);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/user/role/update")
    public ResponseEntity<User> updateUserRole(@RequestBody UpdateUserRoleRequest request) {
        User res = userService.updateUserRole(request);
        return ResponseEntity.ok(res);
    }
}
