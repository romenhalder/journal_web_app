package com.newz.jurnalapp.controller;

import com.newz.jurnalapp.entry.JournalEntry;
import com.newz.jurnalapp.service.JournalEntryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
@Controller
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/journal")
public class JournalEntryContollerV2 {

    @Autowired
    private JournalEntryService journalEntryService;


    @GetMapping("/")
    public String home() {
        return "index"; // returns src/main/resources/templates/index.html
    }
    @GetMapping()
    public ResponseEntity<?> getAll(){
        List<JournalEntry> all=journalEntryService.getAll();
        if(all != null && !all.isEmpty()){
            return new ResponseEntity<>(all,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<JournalEntry> createEntry(@RequestBody JournalEntry myEntry){
       try {
           myEntry.setDate(LocalDateTime.now());
           journalEntryService.saveEntry(myEntry);
           return new ResponseEntity<>(myEntry,HttpStatus.CREATED);
       }catch (Exception e){
           return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
       }
    }
    @GetMapping("id/{myId}")
    public ResponseEntity<JournalEntry> getJournalEntryById(@PathVariable ObjectId myId){
       Optional<JournalEntry> journalEntry=journalEntryService.findByid(myId);
       if(journalEntry.isPresent()){
           return new ResponseEntity<>(journalEntry.get(), HttpStatus.OK);
       }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("id/{myId}")
    public ResponseEntity<?>  deleteJournalEntryById(@PathVariable ObjectId myId){
        journalEntryService.deleteById(myId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @PutMapping
    public ResponseEntity<?> updateJournalById(@PathVariable ObjectId id,@RequestBody JournalEntry newEntry){
       JournalEntry old=journalEntryService.findByid(id).orElse(null);
       if(old!= null){
            old.setTitle(newEntry.getTitle()!=null && !newEntry.getTitle().equals("")?newEntry.getTitle(): old.getTitle());
            old.setContent(newEntry.getContent()!=null && !newEntry.getContent().equals("")?newEntry.getContent(): old.getContent());
            journalEntryService.saveEntry(old );
            return new ResponseEntity<>(old,HttpStatus.OK);
       }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
