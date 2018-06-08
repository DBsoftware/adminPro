import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {
    // tslint:disable-next-line:member-ordering
    public graficos: any = {
      'grafico1': {
        'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
        'data':  [24, 30, 46],
        'type': 'doughnut',
        'leyenda': 'El pan se come con'
      },
      'grafico2': {
        'labels': ['Hombres', 'Mujeres'],
        'data':  [4500, 6000],
        'type': 'doughnut',
        'leyenda': 'Entrevistados'
      },
      'grafico3': {
        'labels': ['Si', 'No'],
        'data':  [95, 5],
        'type': 'doughnut',
        'leyenda': '¿Le dan gases los frijoles?'
      },
      'grafico4': {
        'labels': ['No', 'Si'],
        'data':  [85, 15],
        'type': 'doughnut',
        'leyenda': '¿Le importa que le den gases?'
      },
    };

  public auxCharts: {labels:string[],data:number[],type:string,ley:string }[]=[];
  constructor() {
    for (let i = 0; i < 4; i++) {
      this.auxCharts[i] ={labels:[],type:'',data:[],ley:''};
    }
    for (let index = 0; index < 4; index++) {
      this.auxCharts[index].labels = this.graficos['grafico'+ (index+1) ].labels;
      this.auxCharts[index].type = this.graficos['grafico'+ (index+1) ].type;
      this.auxCharts[index].data = this.graficos['grafico'+ (index+1) ].data;
      this.auxCharts[index].ley = this.graficos['grafico'+ (index+1) ].leyenda;
    }
  }

  ngOnInit() {
  }



}
