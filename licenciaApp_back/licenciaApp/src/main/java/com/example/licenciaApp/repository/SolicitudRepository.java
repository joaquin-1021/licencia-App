package com.example.licenciaApp.repository;

import com.example.licenciaApp.models.Solicitud;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
}
