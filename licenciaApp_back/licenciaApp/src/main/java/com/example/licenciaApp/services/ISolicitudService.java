package com.example.licenciaApp.services;

import com.example.licenciaApp.models.Solicitud;

import java.util.List;

public interface ISolicitudService {

    public Boolean crearSolicitud(Solicitud solicitud);

    public Solicitud buscarSolicitud(Long id);

}
