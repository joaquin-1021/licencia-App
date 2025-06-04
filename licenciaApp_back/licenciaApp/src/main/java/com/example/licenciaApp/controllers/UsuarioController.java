package com.example.licenciaApp.controllers;

import com.example.licenciaApp.models.Solicitud;
import com.example.licenciaApp.models.Usuario;
import com.example.licenciaApp.repository.UsuarioRepository;
import com.example.licenciaApp.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/crear")
    public void crearUsuario(@RequestBody Usuario usuario) {
        usuarioService.crearUsuario(usuario);
    }

    @GetMapping("/login")
    public Usuario buscarUsuarioPorNombre(
    @RequestParam String nombre,
    @RequestParam String password
    ){
        return usuarioService.buscarUsuario(nombre, password);
    }

    @GetMapping("/{id}/solicitudes")
    public List<Solicitud> buscarSolicitudes(@RequestParam Long id) {
        return usuarioService.obtenerSolicitudes(id);
    }

}
