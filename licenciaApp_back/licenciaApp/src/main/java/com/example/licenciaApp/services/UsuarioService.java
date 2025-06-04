package com.example.licenciaApp.services;

import com.example.licenciaApp.models.Solicitud;
import com.example.licenciaApp.models.Usuario;
import com.example.licenciaApp.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public void crearUsuario(Usuario usuario) {
        repository.save(usuario);
    }

    @Override
    public Usuario buscarUsuario(String usuario, String password) {
        Usuario user = repository.findByUsuario(usuario);
        if (user != null && user.getPassword().equals(password)) return user;
        else return null;
    }

    public List<Solicitud> obtenerSolicitudes(Long id){
        return repository.findById(id)
                .map(Usuario::getSolicitudes)
                .orElse(List.of());
    }

}
