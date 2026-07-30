import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-my-account",
  standalone: true,
  imports: [],
  templateUrl: "./my-account.component.html",
})
export class MyAccountComponent {
  public userName: string = '';
  private authService: AuthService = inject(AuthService);

  constructor(public router: Router) {
    this.userName = this.authService.getUser().username ?? '';
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}