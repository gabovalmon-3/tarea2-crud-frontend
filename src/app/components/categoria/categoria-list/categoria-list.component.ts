import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ICategoria } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-list.component.html'
})
export class CategoriaListComponent {
  @Input() categorias: ICategoria[] = [];
  @Output() callModalAction: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() callDeleteAction: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();

  public authService: AuthService = inject(AuthService);
}