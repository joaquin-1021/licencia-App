package com.example.licenciaApp.services;

import com.example.licenciaApp.models.Solicitud;
import com.example.licenciaApp.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SolicitudService implements ISolicitudService {

    @Autowired
    private SolicitudRepository repository;
    @Override
    public void crearSolicitud(Solicitud solicitud) {
        repository.save(solicitud);
    }

    @Override
    public Solicitud buscarSolicitud(Long id) {
        return repository.findById(id).get();
    }
}
