package com.example.demo.services;

import com.example.demo.entity.*;
import com.example.demo.exceptions.UserDontExistException;
import com.example.demo.exceptions.UserExistingWithMail;
import com.example.demo.exceptions.UserExistingWithName;
import com.example.demo.repository.ResetOperationsRepository;
import com.example.demo.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.Cookie;

import java.util.Arrays;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CookieService cookiService;
    private final ResetOperationService resetOperationService;
    private final ResetOperationsRepository resetOperationsRepository;


    @Value("${jwt.exp}")
    private int exp;
    @Value("${jwt.refresh.exp}")
    private int refreshExp;


    private User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.saveAndFlush(user); // Zapisuje i zwraca wynik z bazy danych
    }

    private String generateToken(String username,int exp) {
        return jwtService.generateToken(username,exp);
    }


    public void validateToken(HttpServletRequest request,HttpServletResponse response) throws ExpiredJwtException, IllegalArgumentException{
        String token = null;
        String refresh = null;
        if(request.getCookies() != null) {
            for (Cookie value : Arrays.stream(request.getCookies()).toList()) {
                if (value.getName().equals("Authorization")) {
                    token = value.getValue();
                } else if (value.getName().equals("refresh")) {
                    refresh = value.getValue();
                }
            }
        } else {
            throw new IllegalArgumentException("Token can't be null");
        }
        try {
            jwtService.validateToken(token);
        }catch (IllegalArgumentException | ExpiredJwtException e){
            jwtService.validateToken(refresh);
        }

    }
    public void register(UserRegisterDTO userRegisterDTO) throws UserExistingWithName, UserExistingWithMail {
        userRepository.findUserByLogin(userRegisterDTO.getLogin()).ifPresent((value) -> {
            throw new UserExistingWithName("Użytkownik o nazwie już istnieje");
        });

        userRepository.findUserByEmail(userRegisterDTO.getEmail()).ifPresent((value) -> {
            throw new UserExistingWithMail("Użytkownik o mailu już istnieje");
        });

        User user = new User();
        user.setLock(true);
        user.setLogin(userRegisterDTO.getLogin());
        user.setPassword(userRegisterDTO.getPassword());
        user.setEmail(userRegisterDTO.getEmail());
        if (userRegisterDTO.getRole() != null) {
            user.setRole(userRegisterDTO.getRole());
        } else {
            user.setRole(Role.USER);
        }
        saveUser(user);
        emailService.sendActivation(user);
    }
    public ResponseEntity<?> login(HttpServletResponse response, User authRequest) {
        User user = userRepository.findUserByLoginAndLockAndEnabled(authRequest.getUsername()).orElse(null);
        if (user != null) {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            if (authenticate.isAuthenticated()) {
                Cookie refresh = cookiService.generateCookie("refresh", generateToken(authRequest.getUsername(),refreshExp), refreshExp);
                Cookie cookie = cookiService.generateCookie("Authorization", generateToken(authRequest.getUsername(),exp), exp);
                response.addCookie(cookie);
                response.addCookie(refresh);
                return ResponseEntity.ok(
                        UserRegisterDTO
                                .builder()
                                .login(user.getUsername())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .build());
            } else {
                return ResponseEntity.ok(new AuthResponse(Code.A1));
            }
        }
        return ResponseEntity.ok(new AuthResponse(Code.A2));
    }

    public ResponseEntity<LoginResponse> loggedIn(HttpServletRequest request, HttpServletResponse response){
        try{
            validateToken(request, response);
            return ResponseEntity.ok(new LoginResponse(true));
        }catch (ExpiredJwtException|IllegalArgumentException e){
            return ResponseEntity.ok(new LoginResponse(false));
        }
    }

    public ResponseEntity<?> loginByToken(HttpServletRequest request, HttpServletResponse response){
        try {
            validateToken(request, response);
            String refresh = null;
            for (Cookie value : Arrays.stream(request.getCookies()).toList()) {
                if (value.getName().equals("refresh")) {
                    refresh = value.getValue();
                }
            }
            String login = jwtService.getSubject(refresh);
            User user = userRepository.findUserByLoginAndLockAndEnabled(login).orElse(null);
            if (user != null){
                return ResponseEntity.ok(
                        UserRegisterDTO
                                .builder()
                                .login(user.getUsername())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .build());
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(Code.A1));
        }catch (ExpiredJwtException|IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(Code.A3));
        }
    }

    public void activateUser(String uid) throws UserDontExistException {
        User user = userRepository.findUserByUuid(uid).orElse(null);
        if (user != null){
            user.setLock(false);
            userRepository.save(user);
            return;
        }
        throw new UserDontExistException("User dont exist");
    }

    public void recoveryPassword(String email) throws UserDontExistException{
        User user = userRepository.findUserByEmail(email).orElse(null);
        if (user != null){
            ResetOperations resetOperations = resetOperationService.initResetOperation(user);
            emailService.sendPasswordRecovery(user,resetOperations.getUid());
            return;
        }
        throw new UserDontExistException("User dont exist");
    }


    public void restPassword(ChangePasswordData changePasswordData) throws UserDontExistException{
        ResetOperations resetOperations = resetOperationsRepository.findByUid(changePasswordData.getUid()).orElse(null);
        if (resetOperations != null){
            User user = userRepository.findUserByUuid(resetOperations.getUser().getUuid()).orElse(null);

            if (user != null){
                user.setPassword(changePasswordData.getPassword());
                saveUser(user);
                resetOperationService.endOperation(resetOperations.getUid());
                return;
            }
        }
        throw new UserDontExistException("User dont exist");
    }


}
