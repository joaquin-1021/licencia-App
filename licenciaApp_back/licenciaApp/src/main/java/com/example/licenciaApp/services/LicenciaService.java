package com.example.licenciaApp.services;

import com.example.licenciaApp.dto.AltaLicenciaDTO;
import com.example.licenciaApp.models.Clase;
import com.example.licenciaApp.models.Licencia;
import com.example.licenciaApp.models.Titular;
import com.example.licenciaApp.models.Usuario;
import com.example.licenciaApp.repository.LicenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LicenciaService implements ILicenciaService {

    private final Map<Clase, Map<Integer, Integer>> tablaCostos = Map.of(
            Clase.A, Map.of(5, 40, 4, 30, 3, 25, 1, 20),
            Clase.B, Map.of(5, 40, 4, 30, 3, 25, 1, 20),
            Clase.C, Map.of(5, 47, 4, 35, 3, 30, 1, 23),
            Clase.E, Map.of(5, 59, 4, 44, 3, 39, 1, 29),
            Clase.G, Map.of(5, 40, 4, 30, 3, 25, 1, 20)
    );

    private final int COSTO_ADMINISTRATIVO = 8;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TitularService titularService;

    @Autowired
    private LicenciaRepository licenciaRepository;


    @Override
    public Boolean crearLicencia(AltaLicenciaDTO licenciaDto) {

        // Todos los datos de la licencia vienen del front, solo debo calcular costos, vigencia y si es posible que el titular saque dicha licencia
        // todos los campos vienen llenos excepto costo, fecha de vencimiento, fecha de emision

        Licencia licencia = licenciaDto.getLicencia();
        licencia.setFechaEmision(LocalDate.now());

        Titular titular = titularService.buscarTitular(licenciaDto.getTitular().getNroDocumento());
        Usuario usuario = usuarioService.buscarUsuarioPorNombre(licenciaDto.getUsuario().getUsername());
        if (titular == null || usuario == null) return false;

        licencia.setTitular(titular);

        // Verificar que ya no tenga una licencia de dicha clase
        if(licenciaVigente(titular, licenciaDto.getLicencia().getClase())) return false;

        /* CHEQUEO CLASE C, D y E */
        if (licenciaDto.getLicencia().getClase() == Clase.C
            || licenciaDto.getLicencia().getClase() == Clase.D
            || licenciaDto.getLicencia().getClase() == Clase.E)
        {
            Integer edad = Period.between(titular.getFechaNacimiento(), LocalDate.now()).getYears();
            if(edad > 65 || edad < 21) return null;
            Licencia licenciaB = titular.getLicencia().stream().filter(l -> l.getClase() == Clase.B).findFirst().orElse(null);
            if(licenciaB == null || Period.between(licenciaB.getFechaEmision(), LocalDate.now()).getYears() < 1) return null;
        } else if(Period.between(titular.getFechaNacimiento(), LocalDate.now()).getYears() < 17) return null;

        licencia.setTitular(titular);

        // Calcular fecha de vencimiento según edad, primera vez, etc.
        LocalDate vencimiento = calcularVigencia(titular, licenciaDto.getLicencia().getClase());
        licencia.setFechaVencimiento(vencimiento);
        System.out.println("Fecha de vencimiento" + vencimiento.toString());

        // Calcular años de vigencia
        Integer aniosVigencia = Period.between(LocalDate.now(), vencimiento).getYears();

        // Obtener clase de licencia desde el enum
        Clase clase = licenciaDto.getLicencia().getClase();

        // Obtener costo base desde el mapa
        Integer costoBase = tablaCostos.getOrDefault(clase, Map.of()).get(aniosVigencia);
        if (costoBase == null) return false; // vigencia no válida para esa clase

        // Costo final
        Double costoFinal = (double) (costoBase + COSTO_ADMINISTRATIVO);
        licencia.setCosto(costoFinal);

        licenciaRepository.save(licencia);
        return true;
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

    public Boolean licenciaVigente(Titular titular, Clase clase) {
        List<Licencia> licencias = titular.getLicencia();
        return licencias.stream()
                .anyMatch(licencia ->
                        licencia.getClase() == clase &&
                                !licencia.getFechaVencimiento().isBefore(LocalDate.now())
                );
    }
}
