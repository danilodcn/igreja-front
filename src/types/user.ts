interface IUserBase {
  username?: string
  email: string
}

export interface ILoggingUser extends IUserBase {
  password: string
}

export interface ILoggedUser extends IUserBase {
  id?: number
  name?: string
  image?: string
  token?: string
}
