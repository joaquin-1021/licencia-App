package com.example.licenciaApp.services;

import com.example.licenciaApp.deleted.models.Titular;
import com.example.licenciaApp.repository.TitularRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TitularService implements ITitularService {

    @Autowired
    TitularRepository repository;

    @Override
    public Boolean crearTitular(Titular titular) {

        Optional<Titular> aux = repository.findByNroDocumento(titular.getNroDocumento());

        if( aux.isPresent()) return false;
        else {
            repository.save(titular);
            return true;
        }

    }

    @Override
    public Titular buscarTitular(Integer nroDocumento) {
        return repository.findByNroDocumento(nroDocumento).orElse(null);
    }

    @Override
    public void modificarTitular(Titular titular) {
        repository.save(titular);
    }
}
