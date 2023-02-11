import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public loading = false
  private users$: Observable<User[]>;
  public form = new FormGroup({
    email: new FormControl('dimebag@gmail.com', [Validators.required]),
    password: new FormControl('dime', [Validators.required]),
  })
  private destroyed$ = new Subject();

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly router: Router,
  ) {
    this.users$ = this.userService.users$;
  }

  ngOnInit(): void {
    this.userService.getUsersAuth();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
  }

  login() {
    this.loading = true
    let users: User[] = [];
    this.users$.subscribe(u => users = u);
    let isAuth = this.authService.login({
      email: this.form.get('email')?.value || '',
      password: this.form.get('password')?.value || ''
    }, 
    users);
    this.loading = false
    if (!isAuth){
      this.router.navigate(['auth', 'login']);
    }
    else{
      this.router.navigate(['dashboard', 'students'])
    }
  }
}
