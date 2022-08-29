import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//TODO: componente home para redireccion y enrutado
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onclickCreate(){
    this.router.navigate(['new']);
  }

  invitation(){
    alert("Comparte este URL: https://localhost:4200");
    console.log("COPIED URL");
  }

  onclickList(){
    this.router.navigate(['list']);
  }

}
