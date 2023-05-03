import { Poppins } from 'next/font/google';

import './globals.css';
import Navbar from './components/Navbar/Navbar';
import RegisterModals from './components/models/RegisterModals';
import ToasterProvider from './components/providers/ToasterProvider';
import LoginModals from './components/models/LoginModals';
import getCurrentUsers from './actions/getCurrentUsers';
import RentModals from './components/models/RentModals';


export const metadata = {
  title: 'One Trip Home | Homes Vacation & Condo Rentals.',
  description: 'Find the best places to stay in the world, from apartments to castles.',
}

const fonts = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUsers = await getCurrentUsers();
  return (
    <html lang="en">
      <body className={fonts.className}>
        <ToasterProvider  />
        <LoginModals />
        <RegisterModals />
        <RentModals />
        <Navbar currentUsers={currentUsers} />

        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
};
