package org.example.cardgame.application.handle;


import org.example.cardgame.application.handle.model.JuegoListViewModel;
import org.example.cardgame.application.handle.model.MazoViewModel;
import org.example.cardgame.application.handle.model.TableroViewModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class QueryHandle {

    private final ReactiveMongoTemplate template;

    public QueryHandle(ReactiveMongoTemplate template) {
        this.template = template;
    }

    @Bean
    public RouterFunction<ServerResponse> listarJuego() {
        return route(
                GET("/juego/listar/{id}").and(accept(MediaType.APPLICATION_JSON)),
                request -> template.find(filterByUId(request.pathVariable("id")), JuegoListViewModel.class, "gameview")
                        .collectList()
                        .flatMap(list -> ServerResponse.ok()
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(BodyInserters.fromPublisher(Flux.fromIterable(list), JuegoListViewModel.class)))
        );
    }


    @Bean
    public RouterFunction<ServerResponse> getTablero() {
        return route(
                GET("/juego/getTablero/{id}").and(accept(MediaType.APPLICATION_JSON)),
                request -> template.find(filterByUId(request.pathVariable("id")), TableroViewModel.class, "gameview")
                        .collectList()
                        .flatMap(list -> ServerResponse.ok()
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(BodyInserters.fromPublisher(Flux.fromIterable(list), TableroViewModel.class)))
        );
    }

    @Bean
    public RouterFunction<ServerResponse> getMazo() {
        return route(
                GET("/juego/{id}/getMazo/{uid}").and(accept(MediaType.APPLICATION_JSON)),
                request -> template.find(filterByUIdAndJuegoId(request.pathVariable("id"),request.pathVariable("uid")), MazoViewModel.class, "gameview")
                        .collectList()
                        .flatMap(list -> ServerResponse.ok()
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(BodyInserters.fromPublisher(Flux.fromIterable(list), MazoViewModel.class)))
        );
    }

    private Query filterByUId(String uid) {
        return new Query(
                Criteria.where("uid").is(uid)
        );
    }

    private Query filterByUIdAndJuegoId(String uid, String juegoId) {
        return new Query(
                Criteria.where("uid").is(uid)
                        .and("id").is(juegoId)
        );
    }
}
