package org.example.cardgame.application.handle.model;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class TableroViewModel {
    private Tablero tablero;
    private Integer tiempo;
    private Ronda ronda;

    public Tablero getTablero() {
        return tablero;
    }

    public void setTablero(Tablero tablero) {
        this.tablero = tablero;
    }

    public Integer getTiempo() {
        return tiempo;
    }

    public void setTiempo(Integer tiempo) {
        this.tiempo = tiempo;
    }

    public Ronda getRonda() {
        return ronda;
    }

    public void setRonda(Ronda ronda) {
        this.ronda = ronda;
    }

    public static class Tablero{
        private String id;
        private Set<String> jugadores;
        private Boolean habilitado;
        private Map<String, List<MazoViewModel.Carta>> cartas;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public Set<String> getJugadores() {
            return jugadores;
        }

        public void setJugadores(Set<String> jugadores) {
            this.jugadores = jugadores;
        }

        public Boolean getHabilitado() {
            return habilitado;
        }

        public void setHabilitado(Boolean habilitado) {
            this.habilitado = habilitado;
        }

        public Map<String, List<MazoViewModel.Carta>> getCartas() {
            return cartas;
        }

        public void setCartas(Map<String, List<MazoViewModel.Carta>> cartas) {
            this.cartas = cartas;
        }
    }

    public static class Ronda{
        private Set<String> jugadores;
        private String numero;
        private Boolean estaIniciada;

        public Set<String> getJugadores() {
            return jugadores;
        }

        public void setJugadores(Set<String> jugadores) {
            this.jugadores = jugadores;
        }

        public String getNumero() {
            return numero;
        }

        public void setNumero(String numero) {
            this.numero = numero;
        }

        public Boolean getEstaIniciada() {
            return estaIniciada;
        }

        public void setEstaIniciada(Boolean estaIniciada) {
            this.estaIniciada = estaIniciada;
        }
    }
}
