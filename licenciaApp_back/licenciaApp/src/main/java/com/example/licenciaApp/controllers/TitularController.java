package com.example.licenciaApp.controllers;

import com.example.licenciaApp.models.Titular;
import com.example.licenciaApp.services.TitularService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/titular")
@CrossOrigin(origins = "*")
public class TitularController {

    @Autowired
    private TitularService titularService;

    @GetMapping("/buscar/{nroDocumento}")
    public Titular buscarTitular(@PathVariable Integer nroDocumento) {
        return titularService.buscarTitular(nroDocumento);
    }

    @PutMapping("/modificar")
    public void modificarTitular(@RequestBody Titular titular) {
        titularService.modificarTitular(titular);
    }

    @PostMapping("/crear")
    public void crearTitular(@RequestBody Titular titular) {
        titularService.crearTitular(titular);
    }

}
