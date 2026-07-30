import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent {
  @Input() categoriaForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() callUpdateMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();

  callSave() {
    const categoria: ICategoria = {
      nombre: this.categoriaForm.controls['nombre'].value,
      descripcion: this.categoriaForm.controls['descripcion'].value,
    };

    const id = this.categoriaForm.controls['id'].value;

    if (id) {
      categoria.id = Number(id);
      this.callUpdateMethod.emit(categoria);
    } else {
      this.callSaveMethod.emit(categoria);
    }
  }
}