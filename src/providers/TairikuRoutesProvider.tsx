import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { createContext, useContext, type PropsWithChildren } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Home,
  Login,
  LoginCallback,
  Logout,
  TairikuCategory,
  Test,
} from '../routes'
import {
  type TairikuCategories as TairikuCategoriesType,
  type TairikuCategoryDescription,
} from '../types'

interface ITairikuCategoriesProvider {
  TairikuCategories: TairikuCategoryDescription[]
}

const TairikuCategories = createContext({} as ITairikuCategoriesProvider)
export const useTairikuCategories = () => useContext(TairikuCategories)

export const TairikuRoutesProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['tairiku_categories'],
    queryFn: async () => {
      const { data } = await axios.get<TairikuCategoriesType>(
        'https://api.mganczarczyk.pl/tairiku/categories'
      )
      return data
    },
  })

  if (isLoading || isFetching) return <></>

  const router = createBrowserRouter([
    {
      path: '/test',
      element: <Test />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/login-callback',
      element: <LoginCallback />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    ...(data?.categories.map((category) => ({
      path: `/${category.name}`,
      element: <TairikuCategory />,
    })) ?? []),
    {
      path: '/',
      element: <Home />,
    },
  ])

  return (
    <TairikuCategories.Provider
      value={{
        TairikuCategories: data?.categories ?? [],
      }}
    >
      <RouterProvider router={router} />
      {children}
    </TairikuCategories.Provider>
  )
}
