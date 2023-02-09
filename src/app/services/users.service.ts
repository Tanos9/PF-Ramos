import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { DataAccessService } from './data-access.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users$: Observable<User[]>;

  constructor(
    private readonly _dataAccess: DataAccessService
  )
  {
    this.users$ = this._dataAccess.users$;
  }

  getUsers(): User[] {
    return this._dataAccess.getUsers().slice();
  }

  getUserById(userId: number) {
    return this._dataAccess.getUsers().find(s => s.id === userId);
  }

  addUser(user: User) {
    this._dataAccess.addUserFromAPI(user);
  }

  editUser(id: number, user: User) {
    user.id = id;
    this._dataAccess.editUserFromAPI(user);
  }

  removeUser(id: number) {
    this._dataAccess.deleteUserFromAPI(id);
  }
}
