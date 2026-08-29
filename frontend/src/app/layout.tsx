
import {Lato} from "next/font/google"
import "./globals.css";

const lato = Lato({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
