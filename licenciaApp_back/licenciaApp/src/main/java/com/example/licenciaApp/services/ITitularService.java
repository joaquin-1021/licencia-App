package com.example.licenciaApp.services;

import com.example.licenciaApp.models.Titular;

public interface ITitularService {

    public String crearTitular(Titular titular);

    public Titular buscarTitular(Integer nroDocumento);

    public void modificarTitular(Titular titular);

}
