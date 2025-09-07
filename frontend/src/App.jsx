 import React, { useMemo } from "react"
 import LandingPage from "./pages/LandingPage"
 import HomePage from "./pages/HomePage"
 import { Toaster } from 'react-hot-toast'

function App() {
  const isAuthenticated = useMemo(() => {
    try { return Boolean(localStorage.getItem('token')) } catch { return false }
  }, [])

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      {isAuthenticated ? <HomePage /> : <LandingPage />}
    </>
  )
}

export default App
