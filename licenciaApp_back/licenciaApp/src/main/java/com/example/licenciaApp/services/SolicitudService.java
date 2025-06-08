package com.example.licenciaApp.services;

import com.example.licenciaApp.models.Clase;
import com.example.licenciaApp.models.Solicitud;
import com.example.licenciaApp.models.Titular;
import com.example.licenciaApp.models.Usuario;
import com.example.licenciaApp.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.YearMonth;
import java.util.Map;

@Service
public class SolicitudService implements ISolicitudService {

    private final Map<Clase, Map<Integer, Integer>> tablaCostos = Map.of(
            Clase.A, Map.of(5, 40, 4, 30, 3, 25, 1, 20),
            Clase.B, Map.of(5, 40, 4, 30, 3, 25, 1, 20),
            Clase.C, Map.of(5, 47, 4, 35, 3, 30, 1, 23),
            Clase.E, Map.of(5, 59, 4, 44, 3, 39, 1, 29),
            Clase.G, Map.of(5, 40, 4, 30, 3, 25, 1, 20)
    );

    private final int COSTO_ADMINISTRATIVO = 8;


    @Autowired
    private SolicitudRepository repository;

    @Autowired
    private TitularService titularService;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    public Boolean crearSolicitud(Solicitud solicitud) {
        Titular titular = titularService.buscarTitular(solicitud.getTitular().getNroDocumento());
        Usuario usuario = usuarioService.buscarUsuarioPorNombre(solicitud.getUsuario().getUsername());
        if (titular == null || usuario == null) return false;

        solicitud.setTitular(titular);
        solicitud.setUsuario(usuario);
        solicitud.setFechaInicio(LocalDate.now());

        // Calcular fecha de vencimiento según edad, primera vez, etc.
        LocalDate vencimiento = calcularVigencia(titular, solicitud.getClase());
        //solicitud.setFechaVencimiento(vencimiento);
        System.out.println("Fecha de vencimiento" + vencimiento.toString());

        // Calcular años de vigencia
        Integer aniosVigencia = Period.between(solicitud.getFechaInicio(), vencimiento).getYears();

        // Obtener clase de licencia desde el enum
        Clase clase = solicitud.getClase();

        // Obtener costo base desde el mapa
        Integer costoBase = tablaCostos.getOrDefault(clase, Map.of()).get(aniosVigencia);
        if (costoBase == null) return false; // vigencia no válida para esa clase

        // Costo final
        Double costoFinal = (double) (costoBase + COSTO_ADMINISTRATIVO);
        solicitud.setCosto(costoFinal);

        repository.save(solicitud);
        return true;
    }

    @Override
    public Solicitud buscarSolicitud(Long id) {
        return repository.findById(id).get();
    }

    private LocalDate calcularVigencia(Titular titular, Clase clase) {
        LocalDate hoy = LocalDate.now();
        int edad = Period.between(titular.getFechaNacimiento(), hoy).getYears();
        int añosVigencia;

        // Determinar años de vigencia
        if (edad < 21) {
            añosVigencia = Boolean.TRUE.equals(titular.getPrimeraLicencia()) ? 1 : 3;
        } else if (edad <= 46) {
            añosVigencia = 5;
        } else if (edad <= 60) {
            añosVigencia = 4;
        } else if (edad <= 70) {
            añosVigencia = 3;
        } else {
            añosVigencia = 1;
        }

        // Sumar los años a la fecha actual
        LocalDate vencimientoTentativo = hoy.plusYears(añosVigencia);

        // Ajustar día y mes al de la fecha de nacimiento
        int diaNacimiento = titular.getFechaNacimiento().getDayOfMonth();
        int mesNacimiento = titular.getFechaNacimiento().getMonthValue();

        // Corregir si el día no existe en ese mes (e.g., 30/02)
        int ultimoDiaMes = YearMonth.of(vencimientoTentativo.getYear(), mesNacimiento).lengthOfMonth();
        int diaVencimiento = Math.min(diaNacimiento, ultimoDiaMes);

        LocalDate vencimiento = LocalDate.of(
                vencimientoTentativo.getYear(),
                mesNacimiento,
                diaVencimiento
        );

        // Si la fecha de vencimiento calculada es antes que hoy, restar un año
        if (vencimiento.isBefore(hoy)) {
            vencimiento = vencimiento.minusYears(1);
        }

        return vencimiento;
    }

}
