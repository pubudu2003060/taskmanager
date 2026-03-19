package com.backend.taskmanager.controller;


import com.backend.taskmanager.dto.JwtResponse;
import com.backend.taskmanager.dto.UserDTO;
import com.backend.taskmanager.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody UserDTO user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public JwtResponse login(@Valid @RequestBody UserDTO user) {
        return userService.login(user.getUsername(), user.getPassword());
    }
}
