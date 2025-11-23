export const metadata = {
  title: "Comprendre la mod?ration de contenu",
  description:
    "Qu'est-ce que la mod?ration et pourquoi une invite peut ?tre bloqu?e ?",
};

import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="site-header">
          <div className="container">
            <h1>Comprendre la mod?ration de contenu</h1>
            <p className="subtitle">
              c&apos;est quoi et pourquoi une invite peut ?tre refus?e ?
            </p>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>
              ? {new Date().getFullYear()} Guide p?dagogique ? Aucun suivi, aucune
              collecte de donn?es.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

