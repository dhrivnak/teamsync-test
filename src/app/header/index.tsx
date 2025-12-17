'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export const Header = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated by checking for cookie
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/status')
        const data = await response.json()
        setIsAuthenticated(data.authenticated)
      } catch {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header id="Top-Navigation" className="top-navigation">
      <div className="logo">
        <img
          src="https://assets-global.website-files.com/642ad644644c1d199a312e4b/642c3a0dc2a49420b5205e78_Vectors-Wrapper.svg"
          loading="lazy"
          width="51.41145324707031"
          height="37"
          alt=""
          className="vectors-wrapper"
        />
        <div className="text">TeamSync</div>
      </div>
      <div className="menu-items">
        <a href="#" className="link-2">
          Resources
        </a>
        <a href="#" className="link-2">
          Enterprise
        </a>
        <a href="#" className="link-2">
          Features
        </a>
        <a href="#" className="link-2">
          Articles
        </a>
      </div>
      <div className="actions">
        {isAuthenticated ? (
          <>
            <a href="/dashboard" className="link-2">
              Dashboard
            </a>
            <button onClick={handleLogout} className="link">
              Log out
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="link">
              Log in
            </a>
            <a href="#" className="button w-button">
              Request a demo
            </a>
          </>
        )}
      </div>
    </header>
  )
}