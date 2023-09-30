import { UserManager, type UserManagerSettings } from 'oidc-client'
import { type TairikuTokenDataExtended } from '../types'

const settings: UserManagerSettings = {
  authority: import.meta.env.VITE_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URL,
  post_logout_redirect_uri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URL,
  response_type: import.meta.env.VITE_RESPONSE_TYPE,
  scope: import.meta.env.VITE_SCOPE,
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
