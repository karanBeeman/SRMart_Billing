package com.sr.mart.software.mapper;

import com.sr.mart.software.entity.User;
import com.sr.mart.software.model.LoginResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LoginMapper {

    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "role", source = "user.role.roleName")
    LoginResponse mapLoginRequestToLoginResponse(User user);
}
