import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { setAuthenticatedUser, unsetAuthenticatedUser } from 'src/app/auth/store/auth.actions';
import { AppState } from 'src/app/core/models/app-state.model';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from '../store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken = 'userToken';
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly userService: UsersService,
    private readonly router: Router,
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  searchUser(email: string, password: string, users: User[])  {
    return users.find(u => u.email === email && u.password === password)
  }

  login(data: { email: string; password: string }, users: User[]): boolean {
    let isAuth = false;
    let user = this.searchUser(data.email, data.password, users);
    if (typeof user === "undefined") {
      return isAuth;
    }

    isAuth = true;
    localStorage.setItem('token', this.userToken);
    let authUser = new User(
      user!.id,
      user!.email,
      user!.firstName,
      user!.lastName,
      user!.isAdmin,
      user!.password
    );

    this.store.dispatch(
      setAuthenticatedUser({
        authenticatedUser: authUser
      })
    );

    return isAuth;
  }

  logOut() {
    localStorage.removeItem('token');
    this.store.dispatch(unsetAuthenticatedUser());
    this.router.navigate(['auth', 'login']);
  }

    verifyToken(): boolean {
    const lsToken = localStorage.getItem('token');
    return typeof lsToken !== "undefined";

  }
}
