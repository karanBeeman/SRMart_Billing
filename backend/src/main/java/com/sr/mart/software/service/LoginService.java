package com.sr.mart.software.service;

import com.sr.mart.software.entity.User;
import com.sr.mart.software.model.LoginRequest;
import com.sr.mart.software.model.LoginResponse;
import com.sr.mart.software.repository.UserRepository;
import com.sr.mart.software.responseMapper.LoginMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class LoginService {

    private LoginMapper loginMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(() ->
            new RuntimeException(
                "Invalid username"
            ));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        return loginMapper.mapLoginRequestToLoginResponse(user);
    }

}
