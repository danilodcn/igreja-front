import { AxiosPromise, AxiosRequestConfig } from 'axios'
import { url } from 'inspector'
import { ILoggedUser, ILoggingUser } from '../types/user'
import request from '../utils/request'

export const getToken = (user: ILoggingUser) =>
  request({
    url: 'token/',
    method: 'post',
    data: user,
  })

export const getUser = (config: AxiosRequestConfig) =>
  request({
    url: 'login/',
    method: 'post',
    ...config,
  })

export const login = async (user: ILoggingUser) => {
  const token = await getToken(user).then((res) => res.data.access)

  if (!token) return null

  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const logged_user = await getUser({ headers })
    .then<ILoggedUser>((res) => {
      console.log(res, 'reposta do getUser')
      return res.data
    })
    .catch((error) => {
      console.log(error)
    })
  if (!logged_user) return null

  return logged_user
}

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params,
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data,
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get',
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data,
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete',
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data,
  })
