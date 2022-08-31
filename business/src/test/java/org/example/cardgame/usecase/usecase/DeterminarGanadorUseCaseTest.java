package org.example.cardgame.usecase.usecase;

import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;

class DeterminarGanadorUseCaseTest {

    @InjectMocks
    private DeterminarGanadorUseCase useCase;

    @Mock
    private JuegoDomainEventRepository repository;

    @Test
    void determinarGanador(){

    }
}