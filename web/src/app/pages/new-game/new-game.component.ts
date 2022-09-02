import { Component, OnDestroy, OnInit } from '@angular/core';
import { Jugador } from 'src/app/shared/model/juego';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { v1 as uuidv1 } from 'uuid';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit, OnDestroy {
  //form: FormGroup;
  juegoId: string;
  jugadores?: Jugador[];
  jugadoresSelected: Jugador[] = new Array<Jugador>();;

  constructor(private api: ApiService, private auth: AuthService, private socket:WebsocketService, private router:Router) {
    //this.form = new FormGroup({
    //  jugador: new FormControl()
    //});
    this.juegoId = uuidv1();
     
    api.getJugadores().subscribe((jugadores) => {
      this.jugadores = jugadores;
     });

     socket.open(this.juegoId);
   }
 

  ngOnInit(): void {
    this.socket.listener((event) => {
      if(event.type == "cardgame.juegocreado"){
        this.router.navigate(['list'])
      }
    });
  }

  ngOnDestroy(): void {
    this.socket.close();
  }

  getJugador(e:any, player:Jugador){ 
    if(e.target.checked){
      console.log(player.alias + " Checked");
      this.jugadoresSelected?.push(player);
    }
    else{
      console.log(player.alias + " UnChecked");
      this.jugadoresSelected = this.jugadoresSelected?.filter(m => m != player);
    }
  }

  onSubmit(){
    const jugadores: any = {};
    this.jugadoresSelected?.forEach((user:any) => {
      jugadores[user.uid] = user.alias;
    })

    // this.form.value.jugador.forEach((user:any) => {
    //   jugadores[user.uid] = user.alias;
    // })

    this.api.crearJuego({
      jugadorPrincipalId: this.auth.user.uid,
      juegoId: this.juegoId,
      jugadores:jugadores
    }).subscribe({error: err => alert("Se necesitan 2 jugadores para crear un juego")}
    );
  }
}
