import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { LayoutComponent } from '@/components/LayoutComponent';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Artistas Spotify',
  description: 'Análise de dataset de músicas do Spotify',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}
