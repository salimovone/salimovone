import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";
import RightTab from "@/components/RightTab";
import "@/assets/font.css"
import NavigationBar from "@/components/RightTab/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Salimov Sardor",
  description: "Front-end developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body bgcolor="black" className={inter.className}>
        <main className="min-h-screen w-screen relative overflow-hidden">
          <div className="shadow-1"></div>
          <div className="shadow-2"></div>
          <div className="shadow-3"></div>
          <Logo />
          <div className="container m-auto h-screen">
            <RightTab />
            <NavigationBar />
            <div className="w-full h-screen md:w-1/2 flex justify-center items-center">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
