import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProductoFormComponent } from '../../components/producto/producto-form/producto-form.component';
import { ProductoListComponent } from '../../components/producto/producto-list/producto-list.component';
import { IProducto } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { CategoriaService } from '../../services/categoria.service';
import { ModalService } from '../../services/modal.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    ProductoListComponent,
    ProductoFormComponent,
    ModalComponent
  ],
  templateUrl: './productos.component.html'
})
export class ProductosComponent {
  public productoService: ProductoService = inject(ProductoService);
  public categoriaService: CategoriaService = inject(CategoriaService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  public fb: FormBuilder = inject(FormBuilder);

  @ViewChild('productoModal') public productoModal: any;

  productoForm = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required, Validators.maxLength(150)]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    precio: ['', [Validators.required, Validators.min(0.01)]],
    cantidadStock: ['', [Validators.required, Validators.min(0)]],
    categoriaId: ['', [Validators.required]],
  });

  constructor() {
    this.productoService.getAll();
    this.categoriaService.getAll();
  }

  openCreateModal() {
    this.productoForm.reset({
      id: '',
      nombre: '',
      descripcion: '',
      precio: '',
      cantidadStock: '',
      categoriaId: '',
    });
    this.modalService.displayModal('md', this.productoModal);
  }

  openEditModal(producto: IProducto) {
    this.productoForm.patchValue({
      id: producto.id ? String(producto.id) : '',
      nombre: producto.nombre ?? '',
      descripcion: producto.descripcion ?? '',
      precio: producto.precio !== undefined ? String(producto.precio) : '',
      cantidadStock: producto.cantidadStock !== undefined ? String(producto.cantidadStock) : '',
      categoriaId: producto.categoria?.id ? String(producto.categoria.id) : '',
    });
    this.modalService.displayModal('md', this.productoModal);
  }

  saveProducto(producto: IProducto) {
    this.productoService.save(producto);
    this.modalService.closeAll();
  }

  updateProducto(producto: IProducto) {
    this.productoService.update(producto);
    this.modalService.closeAll();
  }

  deleteProducto(producto: IProducto) {
    this.productoService.delete(producto);
  }
}
