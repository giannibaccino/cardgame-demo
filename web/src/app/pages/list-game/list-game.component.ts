import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

//TODO: componente para el listado de mis juegos
@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.scss']
})
export class ListGameComponent implements OnInit {
 
  juegos ?: any;
  uid : string;

  constructor(private api:ApiService, private router:Router, private auth:AuthService) { 
    this.uid = JSON.parse(localStorage.getItem('user')!).uid;

    this.api.getMisJuegos(this.uid).subscribe((juegos) => {
      this.juegos = juegos;
    })
  }

  ngOnInit(): void {
  }

  startGame(){
    console.log("JUEGO EMPEZADO");
  }
}
