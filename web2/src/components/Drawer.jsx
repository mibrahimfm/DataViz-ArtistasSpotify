'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDrawer } from '../../hooks/use-drawer';

export default function Drawer({ links }) {
  const { isExpanded } = useDrawer();

  const pathname = usePathname();

  return (
    <div
      className={`bg-white dark:bg-[#2C2C2C] rounded-lg shadow-lg p-8 ${
        isExpanded ? 'block' : 'hidden'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#0D9D55]">Visualizações</h2>
      </div>
      <ul className="space-y-2">
        {links.map((l) => (
          <li
            key={l.h}
            style={{ fontWeight: pathname === l.h ? '700' : '500' }}
          >
            <Link
              className="block text-gray-700 dark:text-gray-300 hover:text-[#0D9D55] transition-colors"
              href={l.h}
            >
              {l.t}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
