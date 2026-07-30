import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaFormComponent } from '../../components/categoria/categoria-form/categoria-form.component';
import { CategoriaListComponent } from '../../components/categoria/categoria-list/categoria-list.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ICategoria } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { CategoriaService } from '../../services/categoria.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CategoriaListComponent,
    CategoriaFormComponent,
    ModalComponent
  ],
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent {
  public categoriaService: CategoriaService = inject(CategoriaService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  public fb: FormBuilder = inject(FormBuilder);

  @ViewChild('categoriaModal') public categoriaModal: any;

  categoriaForm = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
  });

  constructor() {
    this.categoriaService.getAll();
  }

  openCreateModal() {
    this.categoriaForm.reset({ id: '', nombre: '', descripcion: '' });
    this.modalService.displayModal('md', this.categoriaModal);
  }

  openEditModal(categoria: ICategoria) {
    this.categoriaForm.patchValue({
      id: categoria.id ? String(categoria.id) : '',
      nombre: categoria.nombre ?? '',
      descripcion: categoria.descripcion ?? '',
    });
    this.modalService.displayModal('md', this.categoriaModal);
  }

  saveCategoria(categoria: ICategoria) {
    this.categoriaService.save(categoria);
    this.modalService.closeAll();
  }

  updateCategoria(categoria: ICategoria) {
    this.categoriaService.update(categoria);
    this.modalService.closeAll();
  }

  deleteCategoria(categoria: ICategoria) {
    this.categoriaService.delete(categoria);
  }
}