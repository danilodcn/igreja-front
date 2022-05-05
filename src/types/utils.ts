export interface IAlert {
  message?: string
  type?: 'error' | 'info' | 'warning'
  active: boolean
}

export const alertDefault: IAlert = {
  type: 'info',
  active: false,
}
