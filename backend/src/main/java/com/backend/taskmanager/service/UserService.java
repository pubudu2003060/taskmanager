package com.backend.taskmanager.service;

import com.backend.taskmanager.dto.JwtResponse;
import com.backend.taskmanager.dto.UserDTO;

public interface UserService {
    public String register(UserDTO user);
    public JwtResponse login(String username, String password);
}
