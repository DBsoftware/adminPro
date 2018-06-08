import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() leyenda = 'Leyenda';
  @Input() porcentaje = 50;

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  cambiar(v) {
    this.porcentaje += v;
    if (this.porcentaje > 100  ) {
    this.porcentaje = 100;
    } else if (this.porcentaje < 0) {
    this.porcentaje = 0;
    }

    this.cambioValor.emit( this.porcentaje );
  }

  onChg(e: number) {

    if (e > 100  ) {
      this.porcentaje  = 100;
    } else if (e < 0) {
    this.porcentaje = 0;
  } else {
    this.porcentaje = e;
  }
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit( this.porcentaje );
    this.txtProgress.nativeElement.focus();
  }
}
