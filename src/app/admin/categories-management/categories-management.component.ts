import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from 'src/app/core/services';
import { startWith, map, switchMap } from 'rxjs/operators';
import { Observable, merge, of, from, Subscription } from 'rxjs';
import { CategoriaTipo } from 'src/app/core/models';
import { OrcaState, From } from 'src/app/core/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-categories-management',
  templateUrl: "./categories-management.component.html",
  styles: [`
    .full-width-table {
      width: 100%;
    } 
  `]
})
export class CategoriesManagementComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cTipo = CategoriaTipo;
  $sub = new Subscription();

  dataSource: MatTableDataSource<string[]>;
  $dataSource: Observable<string[]>;
  tipo: CategoriaTipo = CategoriaTipo.GRUPOS;
  loading = false;
  $loading: Observable<boolean> = of(false);
  resultsLength = 0;
  displayedColumns = ['nombre', 'opciones'];
  pageEvent: PageEvent;
  constructor(
    private fbCateg: CategoriesService,
    private store: Store<OrcaState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.$sub.add(this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const tipo = params.get('tipo');
        this.tipo = (tipo && (
          CategoriaTipo.GRUPOS === tipo
          || CategoriaTipo.GENERO === tipo
          || CategoriaTipo.INSTRUMENTOS === tipo))
          ? tipo : this.tipo;
      }));
    this.$sub.add(this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0));
    this.update();
  }
  delete(s: string) {
    this.$sub.add(
      this.fbCateg.deleteCateg(this.tipo, s)
        .subscribe(null, e => this.loading = true, () => this.loading = false))
  }

  add(newCateg: string) {

    this.$sub.add(
      this.fbCateg.updateCateg(this.tipo, newCateg)
        .subscribe(null, e => this.loading = true, () => { this.loading = false })
    )

  }

  update() {
    this.$dataSource = merge(
      this.sort.sortChange,
      this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = false;
          return this.fetch();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.loading = true;
          console.log(data)
          // this.dataSource = new MatTableDataSource(data);
          // this.dataSource = new MatTableDataSource(data as string[])
          this.resultsLength = data.length;
          return data;
        })
      )
  }
  private fetch(): Observable<string[]> {
    switch (this.tipo) {
      case CategoriaTipo.INSTRUMENTOS:
        return this.store.select(From.music.getInstrumentos);
      case CategoriaTipo.GRUPOS:
        return this.store.select(From.music.getGrupos);
      case CategoriaTipo.GENERO:
        return this.store.select(From.music.getGeneros);
    }
  }
  ngOnDestroy() { this.$sub.unsubscribe(); }

}
