import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot/Chatbot"; // Importamos el Chatbot
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import { ModeToggle } from "@/components/dark-mode/buttomTheme";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mi Aplicación de Recetas",
  description: "Una aplicación para gestionar tus recetas favoritas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
          {/* Contenido principal de la página */}
          <div>{children}</div>

          {/* Chatbot flotante en todas las páginas */}
          <Chatbot /> {/* Este chatbot será visible en todas las páginas */}

        </ThemeProvider>

        {/* Footer en todas las páginas */}
        <Footer />
      </body>
    </html>
  );
}
