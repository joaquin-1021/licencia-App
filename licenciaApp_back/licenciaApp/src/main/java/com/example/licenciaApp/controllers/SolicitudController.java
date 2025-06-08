package com.example.licenciaApp.controllers;

import com.example.licenciaApp.models.Solicitud;
import com.example.licenciaApp.services.SolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/solicitud")
@CrossOrigin(origins = "*")
public class SolicitudController {

    @Autowired
    private SolicitudService solicitudService;

    @PostMapping("/crear")
    public ResponseEntity<String> crearSolicitud(@RequestBody Solicitud solicitud) {
        if(!solicitudService.crearSolicitud(solicitud)) return ResponseEntity.status(HttpStatus.CONFLICT).body("No existe un titular con ese numero de documento.");
        else return ResponseEntity.status(HttpStatus.CREATED).body("Solicitud creada.");
    }

}
