package com.musiccollab.config;

import com.musiccollab.model.Post;
import com.musiccollab.repository.PostRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    @Autowired
    private PostRepository postRepository;

    @PostConstruct
    public void init() {

        System.out.println("🔥 DATA INITIALIZER RUNNING");

        Post p1 = new Post();
        p1.setUsername("Anushka");
        p1.setContent("Just dropped a new melody 🎶");

        Post p2 = new Post();
        p2.setUsername("Arjun");
        p2.setContent("Looking for a guitarist 🎸");

        Post p3 = new Post();
        p3.setUsername("Riya");
        p3.setContent("Late night jam session ✨");

        Post p4 = new Post();
        p4.setUsername("Dev");
        p4.setContent("New beat uploaded 🔥");

        postRepository.save(p1);
        postRepository.save(p2);
        postRepository.save(p3);
        postRepository.save(p4);
    }
}