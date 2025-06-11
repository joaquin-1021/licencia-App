package com.example.licenciaApp.repository;

import com.example.licenciaApp.deleted.models.Titular;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TitularRepository extends JpaRepository<Titular, Long> {
    Optional<Titular> findByNroDocumento(Integer nroDocumento);
}
