import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from 'src/app/core/services';
import { startWith, map, switchMap } from 'rxjs/operators';
import { Observable, merge, of, from, Subscription } from 'rxjs';
import { CategoriaTipo } from 'src/app/core/models';
import { OrcaState, From } from 'src/app/core/store';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  columns = ['nombre', 'opciones'];
  pageEvent: PageEvent;
  constructor(
    private fbCateg: CategoriesService,
    private store: Store<OrcaState>,
    private route: ActivatedRoute,
    public dialog: MatDialog
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
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoCategoria, {
      width: '250px',
      data: { nuevaCateg: '', tipo: this.tipo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.add(result);
    });
  }
  add(newCateg: string) {

    this.$sub.add(
      this.fbCateg.updateCateg(this.tipo, newCateg)
        .subscribe(null, e => this.loading = true, () => { this.loading = false })
    )

  }

  update() {
    this.$dataSource = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = false;
          return this.fetch();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.loading = true;
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
@Component({
  selector: 'app-dialogo-categoria',
  template: `
  <h1 mat-dialog-title>{{data.tipo}}</h1>
  <div mat-dialog-content>
    <p class="mat-body">¿Que va a agregar?</p>
    <mat-form-field>
      <input matInput [(ngModel)]="data.nuevaCateg">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Mejor no</button>
    <button mat-button [mat-dialog-close]="data.nuevaCateg" cdkFocusInitial>Ok</button>
  </div>
`,
})
export class DialogoCategoria {

  constructor(
    public dialogRef: MatDialogRef<DialogoCategoria>,
    @Inject(MAT_DIALOG_DATA) public data: { nuevaCateg: string, tipo: string }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
