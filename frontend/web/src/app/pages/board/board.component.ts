import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carta } from 'src/app/shared/model/mazo';
import { Jugador } from 'src/app/shared/model/juego';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { Clipboard } from '@angular/cdk/clipboard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  registro: Map<string, number> = new Map;
  tira:boolean = false;

  tirador: Jugador[] = [];
  jugadores: Jugador[] = [];
  jugadoresIds: string[] = [];

  cartasDelJugador: Carta[] = [];
  cartasDelTablero: Carta[] = [];
  tiempo: number = 0;
  jugadoresRonda: number = 0;
  jugadoresTablero: number = 0;
  numeroRonda: number = 0;
  juegoId: string = "";
  uid: string = "";
  roundStarted:boolean = false;
  tableroHabilitado:boolean = false;

  constructor(
    public api: ApiService,
    public authService: AuthService,
    public ws: WebsocketService,
    private route: ActivatedRoute,
    private router: Router,
    private clipboard:Clipboard) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.juegoId = params['id'];
      this.uid = this.authService.user.uid;
      this.api.getMiMazo(this.uid, this.juegoId).subscribe((element:any) => {
        this.cartasDelJugador = element.cartas;
      });

      this.api.getTablero(this.juegoId).subscribe((element) => {
        this.jugadoresIds = element.tablero.jugadores;
        this.cartasDelTablero = Object.entries(element.tablero.cartas).flatMap((a: any) => {
          return a[1];
        });
        this.tiempo = element.tiempo;
        this.jugadoresRonda = element.ronda.jugadores.length;
        this.jugadoresTablero = element.tablero.jugadores.length;
        this.numeroRonda = element.ronda.numero;
      });

      this.api.getJugadores().subscribe((jugadores) => 
        jugadores.forEach(jugador => {
          this.registro = new Map(this.jugadoresIds.map(jugid => {return [jugid, 0];}))
          if (this.jugadoresIds.includes(jugador.uid)) 
            this.jugadores.push({uid:jugador.uid, alias:jugador.alias});
      }));
      
      this.ws.open(this.juegoId);
      this.ws.listener(
        (event) => {
          if (event.type === 'cardgame.ponercartaentablero') {
            this.tirador.push(this.jugadores.find(obj => obj.uid === event.jugadorId.uuid)as Jugador);
            this.registro.set(this.tirador[this.tirador.length - 1].uid, this.registro.get(this.uid)as number + 1);
            this.cartasDelTablero.push({
              cartaId: event.carta.cartaId.uuid,
              poder: event.carta.poder,
              estaOculta: event.carta.estaHabilitada,
              estaHabilitada: event.carta.estaHabilitada,
            });
          }
          
          if (this.registro.get(this.uid)as number >= 2) 
            this.tira = false;

          if (event.type === 'cardgame.cartaquitadadelmazo') {
            this.cartasDelJugador = this.cartasDelJugador
              .filter((item) => item.cartaId !==  event.carta.cartaId.uuid);
          }

          if (event.type === 'cardgame.tiempocambiadodeltablero') {
            this.tiempo = event.tiempo;
          }

          if(event.type === 'cardgame.rondainiciada'){
            this.tira = true;
            this.roundStarted = true;
            this.tableroHabilitado = true;
          }

          if(event.type === 'cardgame.rondaterminada'){
            this.tira = false;
            this.tirador = [];
            this.registro = new Map;
            this.cartasDelTablero = [];
            this.roundStarted = false;
            this.tableroHabilitado = false;
          }

          if(event.type == 'cardgame.rondacreada'){
            this.tiempo = event.tiempo;
            this.jugadoresRonda = event.ronda.jugadores.length;
            this.numeroRonda = event.ronda.numero;
            this.tableroHabilitado = false;
            this.roundStarted = false;
          }

          if(event.type === 'cardgame.juegofinalizado'){
            setTimeout(() => {
              Swal.fire({
                title: 'Juego finalizado' + '\n' + 'Ganador: ' + event.alias,
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#9E1A00',
              }).then(result => {
                if (result.isConfirmed)
                  this.router.navigate(['home']);
              });
            }, 1700);
          }

          if(event.type === 'cardgame.cartasasignadasajugador'){
            if(event.ganadorId.uuid === this.uid){
              event.cartasApuesta.forEach((carta: any) => {
                this.cartasDelJugador.push({
                  cartaId: carta.cartaId.uuid,
                  poder: carta.poder,
                  estaOculta: carta.estaOculta,
                  estaHabilitada: carta.estaHabilitada
                });
              });
              Swal.fire({
                icon: 'success',
                title: 'Ganaste la ronda!',
                showConfirmButton: false,
                timer: 1500
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Perdiste la ronda :(',
                showConfirmButton: false,
                timer: 1500
              });
            }
          }
        });
    });
  }


  ngOnDestroy(): void {
    this.ws.close();
  }

  poner(cartaId: string) {
    this.api.ponerCarta({
      cartaId: cartaId,
      juegoId: this.juegoId,
      jugadorId: this.uid
    }).subscribe();
  }

  iniciarRonda(){
    this.api.iniciarRonda({
      juegoId: this.juegoId,
    }).subscribe();
  }

  invitation(){
    this.clipboard.copy("https://cardgame-a9bac.web.app" + this.router.url);
    Swal.fire({
      icon: 'info',
      title: 'Link Copiado',
      showConfirmButton: false,
      timer: 1000
    });
  }
}
