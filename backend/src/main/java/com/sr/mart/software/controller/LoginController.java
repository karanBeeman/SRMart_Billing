package com.sr.mart.software.controller;

import com.sr.mart.software.model.LoginRequest;
import com.sr.mart.software.model.LoginResponse;
import com.sr.mart.software.service.LoginService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
       LoginResponse res = loginService.login(loginRequest);
       return ResponseEntity.ok(res);
    }
}
