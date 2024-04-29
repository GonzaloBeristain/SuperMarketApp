import { CartProvider } from '@/context/CartContext';
import SessionAuthProvider from '@/context/SessionAuthProvider';
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Sections } from "@/components/Sections";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Beristain Market - Ofertas siempre",
  description: "Las mejores ofertas en Beristain Market",
};

export default function RootLayout({ children }) {
  return (
    <SessionAuthProvider>
      <CartProvider>
        <html lang="en">
          <body className="bg-slate-50">
            <Navbar />
            <Sections />
            <main className={inter.className}>
              {children}
            </main>
          </body>
        </html>
      </CartProvider>
    </SessionAuthProvider>
  );
};