import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IProducto } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-list.component.html'
})
export class ProductoListComponent {
  @Input() productos: IProducto[] = [];
  @Output() callModalAction: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Output() callDeleteAction: EventEmitter<IProducto> = new EventEmitter<IProducto>();

  public authService: AuthService = inject(AuthService);
}