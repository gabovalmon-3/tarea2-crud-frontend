import { inject, Injectable, signal } from '@angular/core';
import { ICategoria } from '../interfaces';
import { AlertService } from './alert.service';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<ICategoria> {
  protected override source: string = 'categorias';

  private categoriaListSignal = signal<ICategoria[]>([]);
  private alertService: AlertService = inject(AlertService);

  get categorias$() {
    return this.categoriaListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.categoriaListSignal.set(response);
      },
      error: (error: any) => {
        this.alertService.displayAlert(
          'error',
          'No se pudieron cargar las categorías',
          'center', 'top', ['error-snackbar']
        );
        console.error('error', error);
      }
    });
  }

  public save(categoria: ICategoria) {
    this.add(categoria).subscribe({
      next: () => {
        this.alertService.displayAlert(
          'success',
          'Categoría creada correctamente',
          'center', 'top', ['success-snackbar']
        );
        this.getAll();
      },
      error: (error: any) => {
        this.alertService.displayAlert(
          'error',
          error.error?.mensaje ?? 'No se pudo crear la categoría',
          'center', 'top', ['error-snackbar']
        );
        console.error('error', error);
      }
    });
  }

  public update(categoria: ICategoria) {
    this.edit(categoria.id, categoria).subscribe({
      next: () => {
        this.alertService.displayAlert(
          'success',
          'Categoría actualizada correctamente',
          'center', 'top', ['success-snackbar']
        );
        this.getAll();
      },
      error: (error: any) => {
        this.alertService.displayAlert(
          'error',
          error.error?.mensaje ?? 'No se pudo actualizar la categoría',
          'center', 'top', ['error-snackbar']
        );
        console.error('error', error);
      }
    });
  }

  public delete(categoria: ICategoria) {
    this.del(categoria.id).subscribe({
      next: () => {
        this.alertService.displayAlert(
          'success',
          'Categoría eliminada correctamente',
          'center', 'top', ['success-snackbar']
        );
        this.getAll();
      },
      error: (error: any) => {
        this.alertService.displayAlert(
          'error',
          error.error?.mensaje ?? 'No se pudo eliminar la categoría',
          'center', 'top', ['error-snackbar']
        );
        console.error('error', error);
      }
    });
  }
}