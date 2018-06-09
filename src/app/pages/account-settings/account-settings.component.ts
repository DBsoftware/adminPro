import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public ajustesService: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(color: string, link: any) {
    this.aplicarCheck(link);
    this.ajustesService.aplicarTema(color);
  }

  aplicarCheck(link: any) {
  const selectors: any = document.getElementsByClassName('selector');
  for (const key of selectors) {
      key.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    const aux = this.ajustesService.ajustes.tema;
  const selectors: any = document.getElementsByClassName('selector');
  for (const key of selectors) {
      if (key.getAttribute('data-theme') === aux) {
        key.classList.add('working');
        break;
      }
    }
  }
}
