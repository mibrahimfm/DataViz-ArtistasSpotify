'use client'

import { CalendarMonth, Email, Home, Info, Person } from '@mui/icons-material'
import styles from './styles.module.css'
import { useDrawer } from '@/hooks/use-drawer'
import Link from 'next/link'

export const Drawer = () => {
  const { isExpanded } = useDrawer()

  return (
    <nav className={styles.nav} data-expanded={isExpanded}>
      <ul>
        <li>
          <Link href="/release-date">
            <button className={styles.button}>
              <CalendarMonth />
              Release Date
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
