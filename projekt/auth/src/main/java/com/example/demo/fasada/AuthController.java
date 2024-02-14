package com.example.demo.fasada;

import com.example.demo.entity.*;
import com.example.demo.exceptions.UserDontExistException;
import com.example.demo.exceptions.UserExistingWithMail;
import com.example.demo.exceptions.UserExistingWithName;
import com.example.demo.services.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
//@CrossOrigin // Wszystko na *
//@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserService userService;

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public ResponseEntity<AuthResponse> addNewUser(@Valid @RequestBody UserRegisterDTO user) {
        try {
            userService.register(user);
            return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
        } catch (UserExistingWithName ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthResponse(Code.A4));
        } catch (UserExistingWithMail ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthResponse(Code.A5));
        }

    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
        log.info("--TRY LOGIN USER");
        return userService.login(response, user);
    }

    @RequestMapping(path = "/auto-login", method = RequestMethod.GET)
    public ResponseEntity<?> autoLogin(HttpServletResponse response, HttpServletRequest request) {
        log.info("--TRY AUTO-LOGIN USER");
        return userService.loginByToken(request, response);
    }

    @RequestMapping(path = "/logged-in", method = RequestMethod.GET)
    public ResponseEntity<?> loggedIn(HttpServletResponse response, HttpServletRequest request) {
        log.info("--CHECK USER LOGGED-IN");
        return userService.loggedIn(request, response);
    }

    @RequestMapping(path = "/logout",method = RequestMethod.GET)
    public ResponseEntity<?> logout( HttpServletResponse response,HttpServletRequest request){
        log.info("--TRY LOGOUT USER");
        return userService.logout(request, response);
    }


    @RequestMapping(path = "/validate",method = RequestMethod.GET)
    public ResponseEntity<AuthResponse> validateToken(HttpServletRequest request, HttpServletResponse response) {
        try{
            userService.validateToken(request,response);
            return ResponseEntity.ok(new AuthResponse(Code.PERMIT));
        }catch (IllegalArgumentException | ExpiredJwtException e){
            return ResponseEntity.status(401).body(new AuthResponse(Code.A3));
        }
    }

    @RequestMapping(path = "/activate",method = RequestMethod.GET)
    public ResponseEntity<AuthResponse> activateUser(@RequestParam String uid){
        try{
            userService.activateUser(uid);
            return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
        }catch (UserDontExistException e){
            return ResponseEntity.status(400).body(new AuthResponse(Code.A6));
        }
    }

    @RequestMapping(path = "/reset-password",method = RequestMethod.POST)
    public ResponseEntity<AuthResponse> sendMailRecovery(@RequestBody ResetPasswordData resetPasswordData){
        try{
            userService.recoveryPassword(resetPasswordData.getEmail());
            return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
        }catch (UserDontExistException e){
            return ResponseEntity.status(400).body(new AuthResponse(Code.A6));
        }
    }

    @RequestMapping(path = "/reset-password",method = RequestMethod.PATCH)
    public ResponseEntity<AuthResponse> recoveryMail(@RequestBody ChangePasswordData changePasswordData){
        try{
            userService.restPassword(changePasswordData);
            return ResponseEntity.ok(new AuthResponse(Code.SUCCESS));
        }catch (UserDontExistException e){
            return ResponseEntity.status(400).body(new AuthResponse(Code.A6));
        }
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ValidationMessage handleValidationExceptions(MethodArgumentNotValidException ex) {
        return new ValidationMessage(ex.getBindingResult().getAllErrors().get(0).getDefaultMessage());
    }

}
