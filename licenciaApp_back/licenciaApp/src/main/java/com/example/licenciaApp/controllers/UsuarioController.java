package controllers;

import models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import repository.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/crear")
    public String crearUsuario(@RequestBody Usuario usuario) {
        usuarioRepository.save(usuario);
        return "asd";
    }

}
