package com.musiccollab.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin("*")
public class PostController {

    // 🔥 In-memory storage (temporary DB)
    private final List<Map<String, String>> posts = new ArrayList<>();

    // ✅ GET POSTS
    @GetMapping
    public List<Map<String, String>> getPosts() {
        return posts;
    }

    // ✅ CREATE POST
    @PostMapping
    public Map<String, String> createPost(@RequestBody Map<String, String> post) {

        post.put("time", "just now");

        // optional defaults
        post.putIfAbsent("user", "Anonymous");
        post.putIfAbsent("role", "Artist");

        posts.add(0, post); // newest on top

        return post;
    }

    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable String id) {
        posts.removeIf(post -> post.get("id").equals(id));
        return "Post deleted";
    }

    public PostController() {

        Map<String, String> post1 = new HashMap<>();
        post1.put("user", "Arjun Khanna");
        post1.put("role", "Guitarist");
        post1.put("time", "2h ago");
        post1.put("caption", "Looking for a vocalist for my new indie track 🎶");

        Map<String, String> post2 = new HashMap<>();
        post2.put("user", "Sneha Rao");
        post2.put("role", "Producer");
        post2.put("time", "5h ago");
        post2.put("caption", "Just finished a Bollywood EDM remix 🔥");

        posts.add(post1);
        posts.add(post2);
    }
}