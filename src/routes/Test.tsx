import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { type TairikuTokenDataExtended } from '../types'

export const Test = () => {
  const [user, setUser] = useState<TairikuTokenDataExtended>()

  useEffect(() => {
    const _test = async () => {
      const accessToken = localStorage.getItem('tairiku-auth-client')

      if (accessToken) {
        setUser(JSON.parse(accessToken) as TairikuTokenDataExtended)
      }
    }
    _test()
  }, [])

  return (
    <Link to="/">
      <h1>
        Logged in as{' '}
        {user != null ? user?.profile.preferred_username : 'nobody'}
      </h1>
      <h2>Token: {user != null ? user?.access_token : ''}</h2>
      <h3>
        Permissions:{' '}
        {user != null
          ? user?.realm_access.roles.map((e, _) => {
              return `${e}, `
            })
          : '/'}
      </h3>
    </Link>
  )
}
