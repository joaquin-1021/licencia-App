package com.example.licenciaApp.repository;

import com.example.licenciaApp.deleted.models.Licencia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LicenciaRepository extends JpaRepository<Licencia, Long> {
}
