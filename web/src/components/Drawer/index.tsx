'use client'

import { Email, Home, Info, Person } from '@mui/icons-material'
import styles from './styles.module.css'
import { useDrawer } from '@/hooks/use-drawer'
import Link from 'next/link'

export const Drawer = () => {
  const { isExpanded } = useDrawer()

  return (
    <nav className={styles.nav} data-expanded={isExpanded}>
      <ul>
        <li>
          <Link href="/">
            <button className={styles.button}>
              <Home />
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <button className={styles.button}>
              <Person />
              Profile
            </button>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <button className={styles.button}>
              <Email />
              Contact
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
