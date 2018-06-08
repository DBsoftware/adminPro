import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  porcentajeA = 20;
  porcentajeV = 70;
  constructor() { }

  ngOnInit() {
  }


}
