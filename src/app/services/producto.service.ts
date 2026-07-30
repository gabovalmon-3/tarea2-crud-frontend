import { inject, Injectable, signal } from '@angular/core';
import { IProducto } from '../interfaces';
import { AlertService } from './alert.service';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseService<IProducto> {
  protected override source: string = 'productos';

  private productoListSignal = signal<IProducto[]>([]);
  private alertService: AlertService = inject(AlertService);

  get productos$() {
    return this.productoListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.productoListSignal.set(response);
      },
      error: (error: any) => {
        this.alertService.displayAlert(
          'error',
          'No se pudieron cargar los productos',
          'center', 'top', ['error-snackbar']
        );
        console.error('error', error);
      }
    });
  }

  public save(producto: IProducto) {
    this.add(producto).subscribe({
      next: () => {
        this.alertService.displayAlert(
          'success',
          'Producto creado correctamente',
          'center', 'top', ['success-snackbar']
        );
        this.getAll();
      },
      error: (error: any) => {
        this.alertService.displayAlert(
          'error',
          error.error?.mensaje ?? 'No se pudo crear el producto',
          'center', 'top', ['error-snackbar']
        );
        console.error('error', error);
      }
    });
  }

  public update(producto: IProducto) {
    this.edit(producto.id, producto).subscribe({
      next: () => {
        this.alertService.displayAlert(
          'success',
          'Producto actualizado correctamente',
          'center', 'top', ['success-snackbar']
        );
        this.getAll();
      },
      error: (error: any) => {
        this.alertService.displayAlert(
          'error',
          error.error?.mensaje ?? 'No se pudo actualizar el producto',
          'center', 'top', ['error-snackbar']
        );
        console.error('error', error);
      }
    });
  }

  public delete(producto: IProducto) {
    this.del(producto.id).subscribe({
      next: () => {
        this.alertService.displayAlert(
          'success',
          'Producto eliminado correctamente',
          'center', 'top', ['success-snackbar']
        );
        this.getAll();
      },
      error: (error: any) => {
        this.alertService.displayAlert(
          'error',
          error.error?.mensaje ?? 'No se pudo eliminar el producto',
          'center', 'top', ['error-snackbar']
        );
        console.error('error', error);
      }
    });
  }
}