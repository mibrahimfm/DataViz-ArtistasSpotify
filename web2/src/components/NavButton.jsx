'use client';
import { useDrawer } from '../../hooks/use-drawer';

export default function NavButton({ links }) {
  const { toggle } = useDrawer();

  return (
    <button
      className="text-white hover:text-gray-300 transition-colors"
      type="button"
      onClick={() => toggle()}
    >
      <MenuIcon className="h-6 w-6" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
