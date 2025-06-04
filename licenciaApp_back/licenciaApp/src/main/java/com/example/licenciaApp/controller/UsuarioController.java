package com.example.licenciaApp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {


    @GetMapping("/saludar")
    public String getUsuario() {
        return "Hello World";
    }

}
