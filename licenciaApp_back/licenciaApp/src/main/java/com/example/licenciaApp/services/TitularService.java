package com.example.licenciaApp.services;

import com.example.licenciaApp.models.Titular;
import com.example.licenciaApp.repository.TitularRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TitularService implements ITitularService {

    @Autowired
    TitularRepository repository;

    @Override
    public void crearTitular(Titular titular) {
        repository.save(titular);
    }
}
