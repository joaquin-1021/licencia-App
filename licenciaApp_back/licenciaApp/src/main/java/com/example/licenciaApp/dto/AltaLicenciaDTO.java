package com.example.licenciaApp.dto;

import com.example.licenciaApp.deleted.models.Licencia;
import com.example.licenciaApp.deleted.models.Titular;
import com.example.licenciaApp.deleted.models.Usuario;

public class AltaLicenciaDTO {

    private Titular titular;
    private Usuario usuario;
    private Licencia licencia;

    public Titular getTitular() {
        return titular;
    }

    public void setTitular(Titular titular) {
        this.titular = titular;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Licencia getLicencia() {
        return licencia;
    }

    public void setLicencia(Licencia licencia) {
        this.licencia = licencia;
    }
}
