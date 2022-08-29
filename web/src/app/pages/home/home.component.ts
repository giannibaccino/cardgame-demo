import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

//TODO: componente home para redireccion y enrutado
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onclickCreate(){
    this.router.navigate(['new']);
  }

  invitation(){
    alert("Comparte este URL : http://localhost:4200/menu");
  }

  onclickList(){
    this.router.navigate(['list']);
  }

}
