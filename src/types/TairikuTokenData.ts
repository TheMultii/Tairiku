export interface TairikuTokenData {
  id_token: string
  session_state: string
  access_token: string
  refresh_token: string
  token_type: string
  scope: string
  profile: TairikuTokenProfileData
  expires_at: number
}

export interface TairikuTokenProfileData {
  auth_time: number
  jti: string
  sub: string
  typ: string
  azp: string
  session_state: string
  sid: string
  email_verified: boolean
  preferred_username: string
  email: string
}
