import { useContext, useEffect } from 'react'
import { Toaster } from 'sonner'
import { AppContext } from '~/context/app.context'
import Routes from '~/routes/Routes'
import { LocalStorageEventTarget } from '~/utils/auth'

function App() {
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <>
      <Routes />
      <Toaster richColors />
    </>
  )
}

export default App
