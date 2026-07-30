import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategoria, IProducto } from '../../../interfaces';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './producto-form.component.html'
})
export class ProductoFormComponent {
  @Input() productoForm!: FormGroup;
  @Input() categorias: ICategoria[] = [];
  @Output() callSaveMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  @Output() callUpdateMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();

  callSave() {
    const producto: IProducto = {
      nombre: this.productoForm.controls['nombre'].value,
      descripcion: this.productoForm.controls['descripcion'].value,
      precio: Number(this.productoForm.controls['precio'].value),
      cantidadStock: Number(this.productoForm.controls['cantidadStock'].value),
      categoria: {
        id: Number(this.productoForm.controls['categoriaId'].value)
      }
    };

    const id = this.productoForm.controls['id'].value;

    if (id) {
      producto.id = Number(id);
      this.callUpdateMethod.emit(producto);
    } else {
      this.callSaveMethod.emit(producto);
    }
  }
}