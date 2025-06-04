package com.example.licenciaApp.controllers;

import com.example.licenciaApp.models.Solicitud;
import com.example.licenciaApp.services.SolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/solicitud")
public class SolicitudController {

    @Autowired
    private SolicitudService solicitudService;

    @PostMapping("/crear")
    public void crearSolicitud(@RequestBody Solicitud solicitud) {
        solicitudService.crearSolicitud(solicitud);
    }

}
