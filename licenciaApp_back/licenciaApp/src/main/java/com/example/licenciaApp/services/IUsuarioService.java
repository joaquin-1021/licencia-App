package com.example.licenciaApp.services;

import com.example.licenciaApp.deleted.Solicitud;
import com.example.licenciaApp.deleted.models.Usuario;

import java.util.List;

public interface IUsuarioService {

    public Boolean crearUsuario(Usuario usuario);

    public Usuario buscarUsuario(String usuario, String password);

    public List<Solicitud> obtenerSolicitudes(Long id);

    public Usuario buscarUsuarioPorNombre(String nombre);

}
