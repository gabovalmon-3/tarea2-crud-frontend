import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILoginResponse, IRoleType, IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;
  private user: IUser = {};
  private http: HttpClient = inject(HttpClient);

  constructor() {
    this.load();
  }

  private save(): void {
    localStorage.setItem('auth_user', JSON.stringify(this.user));

    if (this.accessToken) {
      localStorage.setItem('access_token', this.accessToken);
    }
  }

  private load(): void {
    const token = localStorage.getItem('access_token');
    if (token) this.accessToken = token;

    const user = localStorage.getItem('auth_user');
    if (user) this.user = JSON.parse(user);
  }

  public login(credentials: {
    username: string;
    password: string;
  }): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('auth/login', credentials).pipe(
      tap((response: ILoginResponse) => {
        this.accessToken = response.token;
        this.user = {
          username: response.username,
          roles: response.roles,
        };
        this.save();
      })
    );
  }

  public signup(credentials: {
    username: string;
    password: string;
  }): Observable<IUser> {
    return this.http.post<IUser>('auth/signup', credentials);
  }

  public logout(): void {
    this.accessToken = null;
    this.user = {};
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_user');
  }

  public getUser(): IUser {
    return this.user;
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public check(): boolean {
    return !!this.accessToken;
  }

  public getRoles(): string[] {
    return this.user.roles ?? [];
  }

  public hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  public hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => this.hasRole(role));
  }

  public isSuperAdmin(): boolean {
    return this.hasRole(IRoleType.superAdmin);
  }

  public getPermittedRoutes(routes: any[]): any[] {
    const permittedRoutes: any[] = [];

    for (const route of routes) {
      if (route.data && route.data.authorities) {
        if (this.hasAnyRole(route.data.authorities)) {
          permittedRoutes.push(route);
        }
      }
    }

    return permittedRoutes;
  }
}