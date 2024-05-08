import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Flowbite } from 'flowbite-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './context/app.context.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity, // Thời gian cache data, cache data sẽ không bao giờ bị xóa
      refetchOnWindowFocus: false,
      staleTime: Infinity // Thời gian mà data được coi là cũ, sau thời gian này thì data sẽ được fetch lại, Infinity là không bao giờ coi data là cũ
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppProvider>
          <Flowbite>
            <App />
          </Flowbite>
        </AppProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
