import Link from 'next/link'

export function Header() {
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
        <nav>
          <ul className='flex gap-8'>
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
