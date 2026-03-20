package com.backend.taskmanager.controller;

import com.backend.taskmanager.dto.JwtResponse;
import com.backend.taskmanager.dto.RegisteResponce;
import com.backend.taskmanager.dto.UserDTO;
import com.backend.taskmanager.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<RegisteResponce> register(@Valid @RequestBody UserDTO user) {
        String message = userService.register(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisteResponce(message));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody UserDTO user) {
        return ResponseEntity.ok(userService.login(user.getUsername(), user.getPassword()));
    }
}
