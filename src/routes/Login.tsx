import { useEffect } from 'react'
import { login } from '../helpers'

export const Login = () => {
  useEffect(() => {
    const _login = async () => {
      await login()
    }
    _login()
  }, [])

  return <></>
}
