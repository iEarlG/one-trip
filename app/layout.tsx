import { Poppins } from 'next/font/google';

import './globals.css';
import Navbar from './components/Navbar/Navbar';
import RegisterModals from './components/models/RegisterModals';
import ToasterProvider from './components/providers/ToasterProvider';


export const metadata = {
  title: 'One Trip Home | Homes Vacation & Condo Rentals.',
  description: 'Find the best places to stay in the world, from apartments to castles.',
}

const fonts = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fonts.className}>
        <ToasterProvider  />
        <RegisterModals />
        <Navbar />
        {children}
      </body>
    </html>
  );
};
