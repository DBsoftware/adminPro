import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  subRef: Subscription;

  constructor() {


    this.subRef = this.regresaObs().pipe(
      map(o => o.valor),
      filter((valor, index) => ((valor  % 2) === 0 ) ? false : true)
    )
    .subscribe (
    n => console.log('Subs', n),
    err => console.log('err ', err),
    () => console.log('El obs terminó')
  );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subRef.unsubscribe();
  }

  regresaObs(): Observable<any> {
    return new Observable( (ob: Subscriber<any>) => {
      let counter = 0;
      const int = setInterval( () => {
        counter++;
        const salida = {valor: counter};
        ob.next(salida);
        // if (salida.valor === 3) {
        //   clearInterval(int);
        //   ob.complete();
        // }
        // if (counter === 2) {
        //   // clearInterval(int);
        //   ob.error('Help');
        // }
      }, 1000 );
    } );
  }

}
