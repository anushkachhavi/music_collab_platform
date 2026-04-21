package com.musiccollab.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin("*")
public class PostController {

    // In-memory DB (temporary)
    private List<Map<String, String>> posts = new ArrayList<>();

    // GET POSTS
    @GetMapping
    public List<Map<String, String>> getPosts() {
        return posts;
    }

    // CREATE POST
    @PostMapping
    public Map<String, String> createPost(@RequestBody Map<String, String> post) {

        post.put("id", UUID.randomUUID().toString()); // IMPORTANT
        post.put("time", "Just now");

        posts.add(0, post); // newest on top

        return post;
    }

    // DELETE POST
    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable String id) {

        posts.removeIf(post -> post.get("id").equals(id));

        return "Post deleted";
    }
}