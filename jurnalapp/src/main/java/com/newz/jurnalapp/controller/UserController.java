//package com.newz.jurnalapp.controller;
//
//import com.newz.jurnalapp.entry.JournalEntry;
//import com.newz.jurnalapp.entry.User;
//import com.newz.jurnalapp.service.JournalEntryService;
//import com.newz.jurnalapp.service.UserService;
//import org.bson.types.ObjectId;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/user")
//public class UserController {
//    @Autowired
//    private UserService userService;
//
//    @GetMapping
//    public List<User>getUsers(){
//        return userService.getAll();
//    }
//    @PostMapping
//    public void createUser(@RequestBody User user){
//        userService.saveEntry(user);
//    }
//    @PutMapping
//    public ResponseEntity<?> updateUser(@RequestBody User user){
//
////    }
//}
