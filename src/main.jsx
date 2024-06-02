import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Flowbite } from 'flowbite-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './context/app.context.jsx'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1 minute
      retry: 1, // retry once before failing
      refetchOnReconnect: false, // refetch when the network reconnects
      refetchOnWindowFocus: false // refetch only when the tab is focused
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppProvider>
            <Flowbite>
              <App />
            </Flowbite>
          </AppProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
)
