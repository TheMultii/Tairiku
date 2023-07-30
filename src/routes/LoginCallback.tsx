import { UserManager, type User } from 'oidc-client'
import { useEffect } from 'react'
import { decodeToken } from '../helpers'
import { type TairikuTokenData, type TairikuTokenDataExtended } from '../types'

export const LoginCallback = () => {
  useEffect(() => {
    const _loginCallback = async () => {
      try {
        const userManager = new UserManager({ response_mode: 'query' })
        await userManager.signinCallback()

        const user: User = (await userManager.getUser()) as User
        const decodedToken = decodeToken(user.access_token)

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access_token}`,
        }
        const response = await fetch('https://api.mganczarczyk.pl/user', {
          headers,
        })
        const tairikuUser: TairikuTokenData = JSON.parse(JSON.stringify(user))
        const data = await response.json()
        const tairikuUserExtended: TairikuTokenDataExtended = {
          ...tairikuUser,
          tairiku_profile: {
            bio: data.bio,
            comments_number: data.comments_number,
            created_at: data.created_at,
            posts_number: data.posts_number,
            tairiku_images: data.tairiku_images,
          },
          realm_access: decodedToken.realm_access,
        }

        localStorage.setItem(
          'tairiku-auth-client',
          JSON.stringify(tairikuUserExtended)
        )
        window.location.href = '/test'
      } catch (e) {
        console.error(e)
      }
    }
    _loginCallback()
  }, [])

  return <></>
}
