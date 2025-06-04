package com.example.licenciaApp.controllers;

import com.example.licenciaApp.models.Titular;
import com.example.licenciaApp.services.TitularService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/titular")
public class TitularController {

    @Autowired
    private TitularService titularService;

    @PostMapping("/crear")
    public void crearTitular(@RequestBody Titular titular) {
        titularService.crearTitular(titular);
    }

}
