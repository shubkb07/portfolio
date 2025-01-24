import { headers, cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css';

// Load fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }) {
  // Await cookies and headers
  const cookieStore = await cookies();
  const requestHeaders = await headers();

  // Get the "theme" cookie
  const themeCookie = cookieStore.get('theme');

  // Get the "sec-ch-prefers-color-scheme" header
  const prefersColorScheme = requestHeaders.get('sec-ch-prefers-color-scheme');

  // Determine theme with prioritized logic
  const isDarkTheme =
    themeCookie?.value === 'dark' || // If cookie is set and dark
    (!themeCookie && prefersColorScheme === 'dark') || // If no cookie and prefersColorScheme is dark
    (!themeCookie && !prefersColorScheme); // Default to dark if neither is set

  return (
    <html lang="en" className={isDarkTheme ? 'dark' : ''}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
