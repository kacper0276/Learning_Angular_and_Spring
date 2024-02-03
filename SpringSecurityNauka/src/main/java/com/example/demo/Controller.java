package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class Controller {

    private final UserEntityRepository userEntityRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    @GetMapping("/hello")
    public String welcome() {
        return "This endpoint is not secured";
    }

    @PostMapping("/new")
    public String addNewUser(@RequestBody UserEntity userInfo) {
        userService.createUser(userInfo);
        return "User created";
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UserEntity> getAllTheProducts() {
        return userEntityRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public UserEntity getProductById(@PathVariable long id) {
        return userEntityRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try{
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            if (authentication.isAuthenticated()) {
                return jwtService.generateToken(authRequest.getUsername());
            } else {
                throw new UsernameNotFoundException("invalid user request !");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/login")
    public String login() {
        return "Zalogowano";
    }

    @GetMapping("/logout")
    public String logout() {
        return "Wylogowano";
    }
}
