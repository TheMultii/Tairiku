import { UserManager, type UserManagerSettings } from 'oidc-client'
import { type TairikuTokenDataExtended } from '../types'

const settings: UserManagerSettings = {
  authority: 'https://auth.mganczarczyk.pl/realms/mganczarczyk',
  client_id: 'tairiku_frontend',
  redirect_uri: 'http://192.168.1.34:3000/login-callback',
  post_logout_redirect_uri: 'http://192.168.1.34:3000/',
  response_type: 'code',
  scope: 'openid profile email',
}

const userManager = new UserManager(settings)

export const getUser = async () => await userManager.getUser()

export const login = async () => {
  await userManager.signinRedirect()
}

export const logout = async () => {
  await userManager.signoutRedirect()
}

export const register = async () => {
  await userManager.signinRedirect()
}

export const decodeToken = (token: string): TairikuTokenDataExtended => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}
