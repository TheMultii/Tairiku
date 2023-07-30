import { useEffect } from 'react'
import { logout } from '../helpers'

export const Logout = () => {
  useEffect(() => {
    const _logout = async () => {
      await logout()
    }
    _logout()
  }, [])

  return <></>
}
