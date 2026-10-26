import './globals.css';
import { Figtree } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import LanguageGate from '@/components/ui/LanguageGate';
import { Providers } from '@/context/Providers';

const font = Figtree({ subsets: ['latin'], variable: '--font' });

export const metadata = {
  title: 'Ask Gbaja',
  description: 'Clear, sourced answers on President Tinubu’s reforms.',
};

// Runs before the page paints, so there is no flash of the wrong theme.
const themeInit = `try{var t=localStorage.ag_theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={font.variable}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <LanguageGate />
        </Providers>
      </body>
    </html>
  );
}
