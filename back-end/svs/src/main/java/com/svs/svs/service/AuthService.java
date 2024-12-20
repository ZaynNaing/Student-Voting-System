package com.svs.svs.service;

import com.svs.svs.dto.LoginRequestDto;
import com.svs.svs.dto.AuthResponseDto;
import com.svs.svs.dto.SignUpRequestDto;
import com.svs.svs.entity.User;
import com.svs.svs.exception.Exception401;
import com.svs.svs.exception.Exception403;
import com.svs.svs.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponseDto login(LoginRequestDto payload) {
        final Optional<User> optionalUser = userRepository.findByEmailAndPassword(payload.getEmail(), payload.getPassword());
        if (optionalUser.isEmpty()) {
            throw new Exception401("email or password is incorrect.");
        }
        final User user = optionalUser.get();
        return new AuthResponseDto(user.getId(), user.getName());
    }

    public AuthResponseDto signup(SignUpRequestDto payload) {
        if(userRepository.existsUserByEmail(payload.getEmail())) {
            throw new Exception403("email is already taken.");
        }
        final User userToSave = new User(payload.getName(), payload.getEmail(), payload.getPassword());
        final User savedUser = userRepository.save(userToSave);
        return new AuthResponseDto(savedUser.getId(), savedUser.getName());
    }
}
