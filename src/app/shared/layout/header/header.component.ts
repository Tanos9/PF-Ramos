import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { authenticatedUserSelector } from 'src/app/auth/store/auth.actions';
import { AppState } from 'src/app/core/models/app-state.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  user: any;
  
  constructor(
    public readonly authService: AuthService,
    private readonly _store: Store<AppState>) {
  }

  ngOnInit(): void {
    this._store.select(authenticatedUserSelector).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {}

}
