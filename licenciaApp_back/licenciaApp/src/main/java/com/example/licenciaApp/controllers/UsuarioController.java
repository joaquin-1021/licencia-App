package com.example.licenciaApp.controllers;

import com.example.licenciaApp.deleted.Solicitud;
import com.example.licenciaApp.deleted.models.Usuario;
import com.example.licenciaApp.repository.UsuarioRepository;
import com.example.licenciaApp.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> crearUsuario(@RequestBody Usuario usuario) {
        Boolean resultado = usuarioService.crearUsuario(usuario);

        if (!resultado) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Ya existe ese usuario."); // 409 Conflict
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado correctamente."); // 201 Created
        }
    }

    @GetMapping("/login")
    public ResponseEntity<String> logIn(
            @RequestParam String username,
            @RequestParam String password
    ) {
        Usuario usuario = usuarioService.buscarUsuario(username, password);

        if (usuario == null) {
            // Retorna 409 Not Found si el usuario no existe o la contraseña es incorrecta
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuario no encontrado.");
        }else return ResponseEntity.status(HttpStatus.ACCEPTED).body("Usuario logeado."); // Retorna 202 OK con el usuario si se encuentra
    }

    @GetMapping("/{id}/solicitudes")
    public List<Solicitud> buscarSolicitudes(@RequestParam Long id) {
        return usuarioService.obtenerSolicitudes(id);
    }

}
