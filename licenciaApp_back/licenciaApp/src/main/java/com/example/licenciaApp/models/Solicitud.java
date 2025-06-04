package com.example.licenciaApp.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private LocalDate fechaInicio;
    private Double costo;
    @Enumerated(EnumType.STRING)
    private Operacion operacion;
    @Enumerated(EnumType.STRING)
    private Clase clase;
    @JoinColumn(name = "usuario_id")
    @ManyToOne
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "titular_id")
    private Titular titular;

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Clase getClase() {
        return clase;
    }

    public void setClase(Clase clase) {
        this.clase = clase;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Double getCosto() {
        return costo;
    }

    public void setCosto(Double costo) {
        this.costo = costo;
    }

    public Operacion getOperacion() {
        return operacion;
    }

    public void setOperacion(Operacion operacion) {
        this.operacion = operacion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Titular getTitular() {
        return titular;
    }

    public void setTitular(Titular titular) {
        this.titular = titular;
    }
}
