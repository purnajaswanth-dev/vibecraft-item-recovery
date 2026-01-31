package com.srm.lostfound.controller;

import com.srm.lostfound.model.User;
import com.srm.lostfound.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository repo;

    public AuthController(UserRepository repo) {
        this.repo = repo;
    }

    // -------- SIGNUP --------
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (repo.findByUsername(user.getUsername()).isPresent()) {
            return "USER_EXISTS";
        }
        repo.save(user);
        return "SIGNUP_SUCCESS";
    }

    // -------- LOGIN --------
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return repo.findByUsername(user.getUsername())
                .filter(u -> u.getPassword().equals(user.getPassword()))
                .map(u -> "LOGIN_SUCCESS")
                .orElse("INVALID_CREDENTIALS");
    }
}
