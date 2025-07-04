package com.example.licenciaApp.services;

import com.example.licenciaApp.models.Solicitud;
import com.example.licenciaApp.models.Usuario;

import java.util.List;

public interface IUsuarioService {

    public void crearUsuario(Usuario usuario);

    public Usuario buscarUsuario(String usuario, String password);

    public List<Solicitud> obtenerSolicitudes(Long id);

}
