package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.events.*;
import org.example.cardgame.domain.values.*;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Set;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IniciarCuentaRegresivaUseCaseTest {
    @InjectMocks
    private IniciarCuentaRegresivaUseCase useCase;

    @InjectMocks
    private FinalizarRondaUseCase useCase2;

    @Mock
    private JuegoDomainEventRepository repository;

    @Test
    void iniciarCuentaRegresiva(){
        //ARRANGE
        //INICIAR RONDA
        var event = new RondaIniciada();
        event.setAggregateRootId("XXXX");

        //ACT & ASSERT
        when(repository.obtenerEventosPor("XXXX"))
                .thenReturn(history());

        //FALTA LO DEL CASO DE USO

        StepVerifier
                .create(useCase.apply(Mono.just(event)))
                .expectNextMatches(domainEvent -> {
                    var event2 = (TiempoCambiadoDelTablero) domainEvent;
                    return event2.getTableroId().equals(TableroId.of("LLLL"))
                            && event2.getTiempo().equals(3);
                })
                .expectNextMatches(domainEvent -> {
                    var event2 = (TiempoCambiadoDelTablero) domainEvent;
                    return event2.getTableroId().equals(TableroId.of("LLLL"))
                            && event2.getTiempo().equals(2);
                })
                .expectNextMatches(domainEvent -> {
                    var event2 = (TiempoCambiadoDelTablero) domainEvent;
                    return event2.getTableroId().equals(TableroId.of("LLLL"));
                })
                .expectNextMatches(domainEvent -> {
                    var event3 = (RondaTerminada) domainEvent;
                    return  event3.getTableroId().equals(TableroId.of("LLLL"));
                })
                .expectComplete()
                .verify();

    }

    private Flux<DomainEvent> history(){
        //CREAR JUEGO
        var event = new JuegoCreado(JugadorId.of("AAAA"));
        event.setAggregateRootId("XXXX");

        //CREAR TABLERO
        var event2 = new TableroCreado(TableroId.of("LLLL"),
                Set.of(
                        JugadorId.of("AAAA")
                )
        );
        event2.setAggregateRootId("XXXX");

        //CREAR RONDA
        var event3 = new RondaCreada(
                new Ronda(1,
                        Set.of(JugadorId.of("AAAA"),
                                JugadorId.of("BBBB")
                        )
                ), 3);
        event3.setAggregateRootId("XXXX");

        return Flux.just(event, event2, event3);
    }
}