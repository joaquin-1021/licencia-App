package com.example.licenciaApp.repository;

import com.example.licenciaApp.models.Titular;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TitularRepository extends JpaRepository<Titular, Long> {
}
