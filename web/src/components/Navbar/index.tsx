'use client'

import { useDrawer } from '@/hooks/use-drawer'
import styles from './styles.module.css'
import MenuIcon from '@mui/icons-material/Menu'
import { ArrowBackIos } from '@mui/icons-material'
import { cn } from '@/utils/class-name'

export const Navbar = () => {
  const { isExpanded, toggle } = useDrawer()

  return (
    <header className={styles.header}>
      <div className={styles.buttonWrapper} data-is-expanded={isExpanded}>
        <div>
          <button className={styles.button} onClick={toggle}>
            <ArrowBackIos
              className={cn([styles.icon, styles.arrow])}
              data-is-expanded={isExpanded}
            />
            <MenuIcon
              className={cn([styles.icon, styles.menu])}
              data-is-expanded={isExpanded}
            />
          </button>
        </div>
      </div>
      {/* TODO: add title */}
      <h1 className={styles.title}>Dashboard</h1>
    </header>
  )
}
