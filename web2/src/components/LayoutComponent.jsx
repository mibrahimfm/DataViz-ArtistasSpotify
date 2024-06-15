/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/WmTRNwziyD2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Cabin } from 'next/font/google'
import { Rethink_Sans } from 'next/font/google'

cabin({
  subsets: ['latin'],
  display: 'swap',
})

rethink_sans({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Drawer from './Drawer';
import NavButton from './NavButton';

const links = [
  { t: 'Release Date', h: '/release-date' },
  { t: 'Track Number', h: '/track-number' },
  { t: 'Metrics Over Time', h: '/metrics-over-time' },
  { t: 'Metrics By Album Size', h: '/metrics-by-album-size' },
  { t: 'Album', h: '/album-gap' },
  { t: 'Popularidade', h: '/duration-popularity' },
];

export function LayoutComponent({ children }) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0D9D55] dark:bg-[#0B7B43]">
      <header className="bg-[#0D9D55] dark:bg-[#0B7B43] shadow">
        <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Análise de dataset de músicas do Spotify
              </h1>
              <p className="text-gray-200 mt-2">
                Trabalho final de Visualização de Dados - 2024/1
              </p>
            </div>
            <NavButton />
          </div>
        </div>
      </header>
      <div className="flex-1 container mx-auto py-8 px-4 md:px-6 lg:px-8 flex gap-8">
        <Drawer links={links} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}