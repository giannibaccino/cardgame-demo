import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CrearJuegoCommand } from '../commands/crearJuegoCommand';
import { Jugador } from '../model/juego';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, public afs: AngularFirestore,
  ) { }

  crearJuego(command: CrearJuegoCommand) {
    return this.http.post(environment.apiBase + '/juego/crear', command);
  }

 
  getJugadores(): Observable<Jugador[]> {
    return this.afs.collection<User>(`users`).snapshotChanges().pipe(map((actions) => {
      const jugadores = actions.map(item => {
        const data = item.payload.doc.data();
        return {uid: data.uid, alias: data.displayName};
      });
      return jugadores;
    }));
  }

  getMisJuegos(uid: string) { 
    return this.http.get(environment.apiBase + '/juego/listar/' + uid);
  }

  getMiMazo(uid: string, juegoId: string) { 
    return this.http.get(environment.apiBase + '/juego/' + juegoId + '/getMazo/' + uid);
  }

  getTablero(juegoId: string) { 
    return this.http.get(environment.apiBase + '/juego/getTablero/' + juegoId);
  }
}
