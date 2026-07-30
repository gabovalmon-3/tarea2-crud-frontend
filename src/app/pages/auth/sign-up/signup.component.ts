import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SigUpComponent {
  public signUpError!: string;
  public validSignup: boolean = false;
  @ViewChild('username') usernameModel!: NgModel;
  @ViewChild('password') passwordModel!: NgModel;

  public signupForm: { username: string; password: string } = {
    username: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  public handleSignup(event: Event) {
    event.preventDefault();

    if (!this.usernameModel.valid) {
      this.usernameModel.control.markAsTouched();
    }
    if (!this.passwordModel.valid) {
      this.passwordModel.control.markAsTouched();
    }

    if (this.usernameModel.valid && this.passwordModel.valid) {
      this.authService.signup(this.signupForm).subscribe({
        next: () => {
          this.validSignup = true;
          this.signUpError = '';
        },
        error: (err: any) =>
          (this.signUpError = err.error?.mensaje ?? 'No se pudo registrar el usuario'),
      });
    }
  }
}