package com.example.licenciaApp.controllers;

import com.example.licenciaApp.dto.AltaLicenciaDTO;
import com.example.licenciaApp.services.LicenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.http.HttpResponse;

@Controller
@RequestMapping("/licencia")
@CrossOrigin(origins = "*")
public class LicenciaController {

    @Autowired
    private LicenciaService licenciaService;

    @PostMapping("/crear")
    private ResponseEntity<String> crearLicencia(@RequestBody AltaLicenciaDTO licencia) {
        if(licenciaService.crearLicencia(licencia)) return ResponseEntity.status(HttpStatus.CREATED).body("Licencia creada correctamente");
        else return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al crear licencia");

    }

}
