import { AxiosPromise, AxiosRequestConfig } from 'axios'
import { ILoggedUser, ILoggingUser } from '../types/user'
import request from '../utils/request'

export const getToken = (user: ILoggingUser) =>
  request({
    url: 'token/',
    method: 'post',
    data: user,
  }).then((res) => res.data.access)

export const getUser = (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return request({
    url: 'login/',
    method: 'post',
    headers,
  })
    .then<ILoggedUser>((res) => {
      console.log(res, 'reposta do getUser')
      return res.data
    })
    .catch((error) => {
      console.log(error)
      throw new Error('falha na requisição')
    })
}

export const login = async (user: ILoggingUser) => {
  const token = await getToken(user)
  if (!token) return null

  const logged_user = await getUser(token)
  if (!logged_user) return null

  logged_user.token = token
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
