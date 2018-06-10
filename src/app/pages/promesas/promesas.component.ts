import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      b => console.log('termino', b)
    )
    .catch (error => console.error('Error ', error ));
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return  new Promise( (resolve, reject) => {
      let counter = 0;
      const int = setInterval(() => {
        counter += 1;
        console.log(counter);
        if (counter === 3) {
          resolve(true);
          clearInterval(int);
        }
      }, 1000);
    });
  }

}
