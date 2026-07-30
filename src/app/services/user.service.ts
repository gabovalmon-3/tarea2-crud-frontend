import { inject, Injectable, signal } from '@angular/core';
import { ISearch, IUser } from '../interfaces';
import { AlertService } from './alert.service';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<IUser> {
  protected override source: string = 'usuarios';

  private userListSignal = signal<IUser[]>([]);
  private alertService: AlertService = inject(AlertService);

  public search: ISearch = {
    page: 1,
    size: 5
  };

  public totalItems: number[] = [];

  get users$() {
    return this.userListSignal;
  }

  public getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response: any) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from(
          { length: this.search.totalPages ?? 0 },
          (_, i) => i + 1
        );
        this.userListSignal.set(response.data);
      },
      error: (error: any) => {
        this.alertService.displayAlert(
          'error',
          'No se pudieron cargar los usuarios',
          'center', 'top', ['error-snackbar']
        );
        console.error('error', error);
      }
    });
  }
}