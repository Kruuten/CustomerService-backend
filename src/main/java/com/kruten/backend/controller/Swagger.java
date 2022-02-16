package com.kruten.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class Swagger {
    @RequestMapping("/swagger")
    public String toSwagger(){
        return "redirect:/swagger-ui.html";
    }
}
