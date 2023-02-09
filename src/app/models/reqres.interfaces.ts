export interface LoginSuccessful {
  token: string;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean
}

export interface SingleUserResponse {
  data: IUser;
  support: {
      url: string;
      text: string;
  }
}
