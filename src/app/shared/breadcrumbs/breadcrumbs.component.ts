import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;
  constructor( private router: Router,
              private meta: Meta,
              private title: Title ) {

    this.getDataRoute()
    .subscribe(d => {
      this.titulo = d.titulo;
      this.title.setTitle(d.titulo);
      this.meta.updateTag({
        name: 'Description',
        content: this.titulo
      });
    });
  }

  ngOnInit() {
  }

  getDataRoute(): Observable<any> {
    return this.router.events
    .pipe(
      filter(e => e instanceof ActivationEnd),
      filter((e: ActivationEnd) => e.snapshot.firstChild === null),
      map(r => r.snapshot.data)
    );
  }
}
