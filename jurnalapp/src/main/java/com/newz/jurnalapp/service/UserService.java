//package com.newz.jurnalapp.service;
//
//import com.newz.jurnalapp.entry.JournalEntry;
//import com.newz.jurnalapp.entry.User;
//import com.newz.jurnalapp.repository.JournalEntryRepository;
//import com.newz.jurnalapp.repository.UserRepository;
//import org.bson.types.ObjectId;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//import java.util.Optional;
//
//@Component
//public class UserService {
//    @Autowired
//    private UserRepository userRepository;
//
//    public void saveEntry(User user){
//        userRepository.save(user);
//    }
//    public List<User> getAll(){
//        return userRepository.findAll();
//    }
//    public Optional<User> findByid(ObjectId id){
//        return userRepository.findById(id);
//    }
//    public void deleteById(ObjectId id){
//        userRepository.deleteById(id);
//    }
//}
