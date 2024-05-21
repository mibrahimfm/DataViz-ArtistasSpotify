import { Navbar } from '@/components/Navbar'
import { Drawer } from '@/components/Drawer'
import { ReactNode } from 'react'

import styles from './styles.module.css'

type LayoutContentProps = {
  children: ReactNode
}

export const LayoutContent = ({ children }: LayoutContentProps) => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.main}>
        <Drawer />
        {children}
      </div>
    </div>
  )
}
