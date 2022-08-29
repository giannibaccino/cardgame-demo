import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  audio = new Audio();

  constructor() { 
    this.audio.src = "../assets/Marvel-theme.mp3";
    this.audio.loop = true;
    //this.audio.load();
    this.audio.play(); 
  }

  ngOnDestroy(): void {
    this.audio.pause();
    
  }

  ngOnInit() {  
    
  }

}
