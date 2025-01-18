import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function HeaderButton({ href, children, onClick }) {
  const pathname = usePathname()
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`nav-link ${
          pathname == href ? 'active' : ''
        } hover:text-primary transition-colors font-code`}
      >
        {children}
      </Link>
    </li>
  )
}
