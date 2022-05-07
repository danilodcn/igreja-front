interface IUserBase {}

export interface ILoggingUser {
  username?: string
  email: string
  password: string
}

export interface ILoggedUser {
  id?: number
  name: string
  image?: string
  token?: string
}
