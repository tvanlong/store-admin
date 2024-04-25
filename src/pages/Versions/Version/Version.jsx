import { useEffect } from 'react'

function Version({ setProgress }) {
  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])
  return <div></div>
}

export default Version
