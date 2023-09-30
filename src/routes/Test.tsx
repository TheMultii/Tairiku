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
    <div className="mx-4 mb-2 mt-[55px] overflow-hidden">
      <img
        className="pointer-events-none relative -z-10 mx-auto h-[200px] w-full select-none rounded-md object-cover lg:w-3/4"
        src={`https://api.mganczarczyk.pl/user/${
          user?.profile.preferred_username ?? ''
        }/header`}
        alt={`${user?.profile.preferred_username ?? ''} profile banner`}
      />
      <img
        className="pointer-events-none mx-auto mt-[-62.5px] h-[125px] w-[125px] select-none rounded-full border-8 border-solid border-dark-100 object-cover sm:mt-[-75px] sm:h-[150px] sm:w-[150px]"
        src={`https://api.mganczarczyk.pl/user/${
          user?.profile.preferred_username ?? ''
        }/profile`}
        alt={`${user?.profile.preferred_username ?? ''} profile avatar`}
      />
      <h1 className="mb-10 text-center text-3xl sm:text-4xl">
        {user != null ? user?.profile.preferred_username : 'nobody'}
      </h1>
      <Link to="/" className="block text-center uppercase text-primary">
        go back home
      </Link>
    </div>
  )
}
