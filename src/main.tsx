import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { TairikuRoutesProvider } from './providers'
import { type TairikuTokenDataExtended } from './types'

const accessToken = localStorage.getItem('tairiku-auth-client')

if (accessToken) {
  const at: TairikuTokenDataExtended = JSON.parse(accessToken)
  const expireDate = new Date(at.expires_at * 1000)
  if (expireDate < new Date()) {
    localStorage.removeItem('tairiku-auth-client')
    window.location.reload()
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TairikuRoutesProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </TairikuRoutesProvider>
    </QueryClientProvider>
  </StrictMode>
)
