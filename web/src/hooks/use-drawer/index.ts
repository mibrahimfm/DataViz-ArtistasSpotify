import { useAtom } from 'jotai'
import { DRAWER_ATOM } from './atom'

export const useDrawer = () => {
  const [isExpanded, setIsExpanded] = useAtom(DRAWER_ATOM)

  const toggle = () => setIsExpanded((current) => !current)

  return {
    isExpanded,
    toggle
  }
}
