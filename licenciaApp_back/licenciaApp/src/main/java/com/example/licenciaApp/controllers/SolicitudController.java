package com.example.licenciaApp.controllers;

import com.example.licenciaApp.models.Solicitud;
import com.example.licenciaApp.services.SolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/solicitud")
@CrossOrigin(origins = "*")
public class SolicitudController {

    @Autowired
    private SolicitudService solicitudService;

    @PostMapping("/crear")
    public void crearSolicitud(@RequestBody Solicitud solicitud) {
        solicitudService.crearSolicitud(solicitud);
    }

}
