import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, type PropsWithChildren } from 'react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Footer, Header } from '../components'
import { fetchTairikuCategories } from '../helpers'
import {
  Home,
  Login,
  LoginCallback,
  Logout,
  TairikuCategory,
  TairikuImageDetails,
  Test,
} from '../routes'
import { type TairikuCategoryDescription } from '../types'

interface ITairikuCategoriesProvider {
  TairikuCategories: TairikuCategoryDescription[]
}

const TairikuCategories = createContext({} as ITairikuCategoriesProvider)
export const useTairikuCategories = () => useContext(TairikuCategories)

export const TairikuRoutesProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['tairiku_categories'],
    queryFn: async () => await fetchTairikuCategories(),
  })

  if (isLoading || isFetching) return <></>

  const router = createBrowserRouter([
    {
      element: <TairikuOutlet />,
      children: [
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
        {
          path: '/details/:id',
          element: <TairikuImageDetails />,
        },
        ...(data?.categories.map((category) => ({
          path: `/${category.name}`,
          element: <TairikuCategory />,
        })) ?? []),
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '*',
          element: (
            <div className="grid h-screen place-items-center">
              <div>
                <h1 className="spin mb-4 text-5xl">:c</h1>
                <p>404</p>
              </div>
            </div>
          ),
        },
      ],
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

const TairikuOutlet = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
