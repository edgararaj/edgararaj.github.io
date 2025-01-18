'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMenuOpen])

  return (
    <header className='w-full max-w-6xl mx-auto px-6 py-8'>
      <div className='flex items-center justify-between'>
        <Link className='flex items-center gap-3' href='/'>
          <p className='font-cube text-xl'>E</p>
          <div>
            <h1 className='text-3xl font-primary'>Edgar Araújo</h1>
            <p className='text-sm text-gray-400 font-code'>Personal Blog</p>
          </div>
        </Link>
        <button
          className={`block md:hidden z-50 transition-transform duration-300 ease-out ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className='transition-transform duration-300 ease-out' />
          ) : (
            <Menu className='transition-transform duration-300 ease-out' />
          )}
        </button>
        <nav
          className={`fixed inset-0 bg-dark-primary/80 flex flex-col items-center justify-center transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:static md:translate-x-0 md:flex-row md:bg-transparent`}
        >
          <ul className='flex flex-col md:flex-row gap-8'>
            <li>
              <Link
                href='/blog'
                className='nav-link hover:text-primary transition-colors font-code'
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href='/about'
                className='nav-link hover:text-primary transition-colors font-code'
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href='/projects'
                className='nav-link active hover:text-primary transition-colors font-code'
              >
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
