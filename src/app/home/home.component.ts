import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 // images = [1, 2, 3].map(() => `/assets/carousal/BravoCards_MockUp.jpg?random&t=${Math.random()}`);
 interval : number = 2000 ;
  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
   }

  ngOnInit() {
    
  }

}
