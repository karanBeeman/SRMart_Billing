package com.sr.mart.software.model;

import com.sr.mart.software.enums.UserRoles;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String username;
    private UserRoles role;

}
