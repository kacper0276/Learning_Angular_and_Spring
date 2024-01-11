import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import {
  GetUsersResponse,
  PostUser,
  PostUsersResponse,
  User,
  UserLoginData,
} from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(userData: UserLoginData): Observable<User[]> {
    return this.http.get<GetUsersResponse[]>(`${this.apiUrl}/users`).pipe(
      map((userArr) =>
        userArr.filter(
          (user) =>
            user.username === userData.username &&
            user.password === userData.password,
        ),
      ),
      map((userArr) =>
        userArr.map((user) => new User(user.email, user.username)),
      ),
      tap((userArr) => this.handleAuthentication(userArr)),
    );
  }

  register(userData: PostUser): Observable<PostUsersResponse> {
    return this.http.post<PostUsersResponse>(`${this.apiUrl}/users`, userData);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/logowanie']);

    localStorage.removeItem('user');
  }

  autoLogin() {
    const userData: { email: string; username: string } = JSON.parse(
      localStorage.getItem('user') as string,
    );

    if (!userData) {
      return;
    }

    const user = new User(userData.email, userData.username);
    this.user.next(user);
  }

  private handleAuthentication(userArr: User[]) {
    if (userArr.length === 0) {
      return;
    }

    const user: User = userArr[0];
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));

    this.router.navigate(['/klienci']);
  }
}
