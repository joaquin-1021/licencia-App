package com.example.licenciaApp.services;

import com.example.licenciaApp.models.Solicitud;
import com.example.licenciaApp.models.Usuario;
import com.example.licenciaApp.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public String crearUsuario(Usuario usuario) {

        Optional<Usuario> aux = repository.findByUsuario(usuario.getUsuario());

        if (aux.isPresent()) return "Ya existe ese usuario";
        else {
            repository.save(usuario);
            return "Usuario creado";
        }

    }

    @Override
    public Usuario buscarUsuario(String usuario, String password) {
        Optional<Usuario> user = repository.findByUsuario(usuario);
        if (user.isPresent() && user.get().getPassword().equals(password)) return user.get();
        else return null;
    }

    public List<Solicitud> obtenerSolicitudes(Long id){
        return repository.findById(id)
                .map(Usuario::getSolicitudes)
                .orElse(List.of());
    }

}
