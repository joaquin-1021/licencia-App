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
    public Boolean crearUsuario(Usuario usuario) {

        Optional<Usuario> aux = repository.findByUsername(usuario.getUsername());

        if (aux.isPresent()) return false;
        else {
            repository.save(usuario);
            return true;
        }

    }

    @Override
    public Usuario buscarUsuario(String usuario, String password) {
        Optional<Usuario> user = repository.findByUsername(usuario);
        if (user.isPresent() && user.get().getPassword().equals(password)) return user.get();
        else return null;
    }

    public List<Solicitud> obtenerSolicitudes(Long id){
        return repository.findById(id)
                .map(Usuario::getSolicitudes)
                .orElse(List.of());
    }

    @Override
    public Usuario buscarUsuarioPorNombre(String nombre) {
        Optional<Usuario> user = repository.findByUsername(nombre);
        return user.orElse(null);
    }


}
