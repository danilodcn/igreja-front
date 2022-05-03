interface IUserBase {}

export interface ILoggingUser {
  username?: string
  email: string
  password: string
}

export interface ILoggedUser {
  name: string
  url?: string
  token?: string
}
