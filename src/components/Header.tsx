import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { ChevronRight, Menu, User } from 'react-feather'
import { Link } from 'react-router-dom'
import { useLockBodyScroll, useToggle } from 'react-use'
import { queryClient } from '../main'
import { type TairikuCategories, type TairikuTokenDataExtended } from '../types'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useToggle(false)

  useLockBodyScroll(isMenuOpen)

  const tairikuCategories: UseQueryResult<TairikuCategories> = useQuery({
    queryKey: ['tairiku_categories'],
    initialData: () => {
      return queryClient.getQueryData(['tairiku_categories'])
    },
  })

  useEffect(() => {
    const escListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', escListener)

    return () => {
      document.removeEventListener('keydown', escListener)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [user, setUser] = useState<TairikuTokenDataExtended | undefined>()

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'tairiku-auth-client') {
        setUser(event.newValue ? JSON.parse(event.newValue) : null)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    const accessToken = localStorage.getItem('tairiku-auth-client')
    console.log(accessToken)
    if (accessToken) {
      setUser(JSON.parse(accessToken) as TairikuTokenDataExtended)
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <>
      <div className="fixed left-0 top-0 z-10 flex min-h-[50px] w-screen flex-row items-center justify-between bg-black/50 px-6 backdrop-blur-md">
        <span className="flex flex-row items-center justify-center gap-x-2">
          <Menu
            className="cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen)
            }}
          />
          <span className="hidden sm:invisible sm:inline">
            {user?.profile.preferred_username}
          </span>
        </span>
        <Link to="/">
          <h1 className="font-[Oswald] text-2xl font-normal uppercase not-italic text-white">
            Tairiku
          </h1>
        </Link>
        <Link
          to={`${user === undefined ? '/login' : '/test'}`}
          className="flex flex-row items-center justify-center gap-x-2"
        >
          <span className="hidden sm:inline">
            {user?.profile.preferred_username}
          </span>
          <User className="cursor-pointer" />
        </Link>
      </div>
      <div
        className={classNames(
          'fixed top-0 z-10 h-screen w-[250px] overflow-x-hidden bg-black/50 pb-2 pt-[.8rem] backdrop-blur-md transition-all duration-300',
          {
            'left-0': isMenuOpen,
            'left-[-255px]': !isMenuOpen,
          }
        )}
      >
        <Menu
          className="mx-6 mb-2 cursor-pointer"
          onClick={() => {
            console.log('click')
            setIsMenuOpen(!isMenuOpen)
          }}
        />
        {tairikuCategories.data.categories.map((category, index) => (
          <Link
            to={`/${category.name}`}
            key={index}
            onClick={() => {
              setIsMenuOpen(false)
            }}
            className="mx-2 flex select-none flex-row items-center justify-between rounded-md p-2 transition-all duration-300 hover:bg-white/10"
          >
            <span className="flex flex-row items-center gap-x-1">
              {category.nsfw && <span>⚠️</span>}
              {category.pretty_name}
            </span>
            <ChevronRight color="white" />
          </Link>
        ))}
      </div>
      {isMenuOpen && (
        <div
          className="fixed left-0 top-0 z-[9] h-screen w-screen"
          onClick={() => {
            setIsMenuOpen(false)
          }}
        ></div>
      )}
    </>
  )
}
