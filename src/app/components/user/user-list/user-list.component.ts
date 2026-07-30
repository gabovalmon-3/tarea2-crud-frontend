import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IUser } from '../../../interfaces';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input() users: IUser[] = [];
}