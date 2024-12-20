package com.svs.svs.controller;

import com.svs.svs.dto.AuthResponseDto;
import com.svs.svs.dto.LoginRequestDto;
import com.svs.svs.dto.SignUpRequestDto;
import com.svs.svs.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponseDto login(@RequestBody LoginRequestDto payload) {
        return authService.login(payload);
    }

    @PostMapping("/signup")
    public AuthResponseDto signup(@RequestBody SignUpRequestDto payload) {
        return authService.signup(payload);
    }
}
