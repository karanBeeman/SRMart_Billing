package com.sr.mart.software.responseMapper;

import com.sr.mart.software.enums.UserRoles;
import com.sr.mart.software.model.LoginResponse;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LoginMapper {

    @Mapping(target = "username", source="userName")
    @Mapping(target = "roles", source="response")
    LoginResponse mapLoginRequestToLoginResponse(String userName, List<UserRoles> response);
}
