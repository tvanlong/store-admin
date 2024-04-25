import { useEffect } from 'react'

function UpdateVersion({ setProgress }) {
  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])
  return <div></div>
}

export default UpdateVersion
