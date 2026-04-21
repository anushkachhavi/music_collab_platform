package com.musiccollab.controller;

import com.musiccollab.config.JwtUtils;
import com.musiccollab.dto.LoginRequest;
import com.musiccollab.dto.LoginResponse;
import com.musiccollab.entity.User;
import com.musiccollab.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.security.Principal;
import java.util.Optional;

// File handling
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepo;

    // ✅ Constructor Injection
    public AuthController(AuthenticationManager authManager,
                          JwtUtils jwtUtils,
                          UserRepository userRepo,
                          PasswordEncoder passwordEncoder) {
        this.authManager = authManager;
        this.jwtUtils = jwtUtils;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password cannot be empty");
        }

        // 🔥 IMPORTANT LINE
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername(),
                        req.getPassword()
                )
        );

        String token = jwtUtils.generateToken(req.getUsername());

        return ResponseEntity.ok(new LoginResponse(token, req.getUsername()));
    }

    // ================= GET USER =================
    @GetMapping("/user")
    public ResponseEntity<?> getUser(Principal principal) {

        if (principal == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        Optional<User> user = userRepo.findByUsername(principal.getName());

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    // ================= GET CURRENT USER (/me) =================
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        Optional<User> user = userRepo.findByUsername(authentication.getName());

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    // ================= UPLOAD PROFILE PIC =================
    @PostMapping("/upload")
    public ResponseEntity<String> uploadProfilePic(
            @RequestParam("file") MultipartFile file,
            Principal principal
    ) throws IOException {

        if (principal == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        User user = userRepo.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String uploadDir = "uploads/";

        File dir = new File(uploadDir);
        if (!dir.exists()) {
            boolean created = dir.mkdirs();
            if (!created) {
                throw new RuntimeException("Could not create upload directory");
            }
        }

        String originalName = file.getOriginalFilename();

        if (originalName == null || originalName.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid file name");
        }

        // ✅ SAFE filename (no path traversal warning)
        String safeFileName = originalName.replaceAll("[^a-zA-Z0-9.-]", "_");
        safeFileName = new File(safeFileName).getName();

        String fileName = System.currentTimeMillis() + "_" + safeFileName;

        File destination = new File(uploadDir + fileName);
        file.transferTo(destination);

        user.setProfilePic(fileName);
        userRepo.save(user);

        return ResponseEntity.ok("Uploaded successfully");
    }
}