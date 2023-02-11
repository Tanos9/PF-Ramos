import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/models/app-state.model';
import { authenticatedUserSelector } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  user: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(authenticatedUserSelector).subscribe((user) => {
      this.user = user;
    });
  }

}
