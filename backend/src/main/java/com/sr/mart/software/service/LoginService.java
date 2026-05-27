package com.sr.mart.software.service;

import com.sr.mart.software.enums.UserRoles;
import com.sr.mart.software.model.LoginRequest;
import com.sr.mart.software.model.LoginResponse;
import com.sr.mart.software.responseMapper.LoginMapper;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class LoginService {

    private LoginMapper loginMapper;

    public LoginResponse login(LoginRequest loginRequest) {
        List<UserRoles> response = listOfRoles(loginRequest);
        return loginMapper.mapLoginRequestToLoginResponse(loginRequest.getUsername(), response);
    }

    private List<UserRoles> listOfRoles(LoginRequest loginRequest) {
        if(loginRequest.getUsername().equalsIgnoreCase("preetha")) {
            return List.of(UserRoles.BILLER);
        } else {
            return List.of(UserRoles.ADMIN, UserRoles.BILLER);
        }
    }
}
