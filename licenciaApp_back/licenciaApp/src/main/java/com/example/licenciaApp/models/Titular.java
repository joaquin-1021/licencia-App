package com.example.licenciaApp.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Titular {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private TipoDocumento tipoDocumento;
    private Integer nroDocumento;
    private String nombre;
    private String apellido;
    private LocalDate fechaNacimiento;
    private String direccion;
    private GrupoSanguineo grupoSangre;
    private Boolean donante;
    private Boolean primeraLicencia = false;

    @OneToMany(mappedBy = "titular", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Licencia> licencia;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public Integer getNroDocumento() {
        return nroDocumento;
    }

    public void setNroDocumento(Integer nroDocumento) {
        this.nroDocumento = nroDocumento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public GrupoSanguineo getGrupoSangre() {
        return grupoSangre;
    }

    public void setGrupoSangre(GrupoSanguineo grupoSangre) {
        this.grupoSangre = grupoSangre;
    }

    public Boolean getDonante() {
        return donante;
    }

    public void setDonante(Boolean donante) {
        this.donante = donante;
    }

    public Boolean getPrimeraLicencia() {
        return primeraLicencia;
    }

    public void setPrimeraLicencia(Boolean primeraLicencia) {
        this.primeraLicencia = primeraLicencia;
    }

    public List<Licencia> getLicencia() {
        return licencia;
    }

    public void setLicencia(List<Licencia> licencia) {
        this.licencia = licencia;
    }
}
