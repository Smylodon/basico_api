// layout.tsx - VERSÃO FUNCIONAL
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prova Adair",
  description: "Gestão de veículos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-amber-50 min-h-screen`}>
        
        {/* Header */}
        <div className="px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-2 h-8 bg-rose-900"></div>
                <h1 className="text-xl font-medium text-rose-900">
                  Prova Adair
                </h1>
              </div>

              {/* Menu */}
              <div className="flex items-center space-x-4">
                <Link 
                  href="/" 
                  className="text-sm text-amber-800 hover:text-rose-900"
                >
                  Início
                </Link>
                <Link 
                  href="/carros" 
                  className="text-sm text-amber-800 hover:text-rose-900"
                >
                  Veículos
                </Link>
                <Link 
                  href="/carros/new" 
                  className="text-sm text-white bg-rose-900 px-4 py-2 rounded hover:bg-rose-950"
                >
                  + Novo
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-amber-100">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-amber-100">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs text-amber-600 text-center">
              Prova_ADAIR • {new Date().getFullYear()}
            </p>
          </div>
        </div>

      </body>
    </html>
  );
}