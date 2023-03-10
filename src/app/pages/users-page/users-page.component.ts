import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { DeleteAlertDialogComponent } from 'src/app/shared/components/delete-alert-dialog/delete-alert-dialog/delete-alert-dialog.component';
import { UserDialogComponent } from 'src/app/shared/components/user-dialog/user-dialog.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  public users$!: Observable<User[]>;
  private readonly customDeleteTitle = "Confirma eliminar este usuario?";
  private readonly customDeleteDetail = "Se eliminaran todos sus datos";

  displayedColumns = ['id', 'isAdmin', 'name', 'email', 'edit', 'delete'];

  constructor(
    private readonly _dialogService: MatDialog,
    public _usersService: UsersService
  )
  {
  }

  ngOnInit() : void{
    this.users$ = this._usersService.users$;
  }

  addUser() {
    const dialog = this._dialogService.open(UserDialogComponent)

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this._usersService.addUser(value);
      }
    })
  }

  removeUser(user: User) {
    this._usersService.removeUser(user.id)
  }

  editUser(user: User) {
    const dialog = this._dialogService.open(UserDialogComponent,
    {
      data: user,
    })

    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this._usersService.editUser(user.id, data);
      }
    })
  }

  openDeleteDialog(user: User): void {
    const dialogRef = this._dialogService.open(DeleteAlertDialogComponent,
      {
        data: {
          customTitle: this.customDeleteTitle,
          customDetail: this.customDeleteDetail
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeUser(user);
      }
   });
 }
}

