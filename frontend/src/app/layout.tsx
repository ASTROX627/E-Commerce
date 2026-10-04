import { Lato } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/header";
import { QueryProvider } from "@/providers/react-query-provider";
import { ReduxProvider } from "@/providers/redux-provider";

const lato = Lato({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body>
        <ReduxProvider>
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
