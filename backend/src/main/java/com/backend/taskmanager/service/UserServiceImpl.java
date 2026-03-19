package com.backend.taskmanager.service;

import com.backend.taskmanager.dto.JwtResponse;
import com.backend.taskmanager.dto.UserDTO;
import com.backend.taskmanager.exception.UserNotFoundException;
import com.backend.taskmanager.model.User;
import com.backend.taskmanager.repository.UserRepository;
import com.backend.taskmanager.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepo, PasswordEncoder encoder, JwtUtil jwtUtil, ModelMapper modelMapper) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.modelMapper = modelMapper;
    }

    @Override
    public String register(UserDTO user)  {
        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(modelMapper.map(user,User.class));
        return "User registered";
    }

    @Override
    public JwtResponse login(String username, String password) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return new JwtResponse(jwtUtil.generateToken(username));
    }
}
