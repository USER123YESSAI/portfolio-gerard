import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-gerard.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gérard Jonathan Iahli Gong-Non Moundou — Étudiant en CPGE | EPF Africa Dakar",
    template: "%s | Gérard Jonathan Moundou",
  },
  description:
    "Portfolio personnel de Gérard Jonathan Iahli Gong-Non Moundou, étudiant en Classes Préparatoires aux Grandes Écoles (CPGE) à EPF Africa Dakar. Découvrez son parcours académique, ses compétences et ses centres d'intérêt.",
  keywords: [
    "Gérard Jonathan Iahli Gong-Non Moundou",
    "Gérard Jonathan Moundou",
    "Gérard Moundou",
    "CPGE",
    "Classes Préparatoires aux Grandes Écoles",
    "EPF Africa Dakar",
    "Étudiant Ingénieur Dakar",
    "Mathématiques",
    "Physique",
    "Sciences de l'Ingénieur",
    "Portfolio Gérard Jonathan"
  ],
  authors: [{ name: "Gérard Jonathan Iahli Gong-Non Moundou", url: siteUrl }],
  creator: "Gérard Jonathan Iahli Gong-Non Moundou",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gérard Jonathan Iahli Gong-Non Moundou — Étudiant en CPGE",
    description:
      "Portfolio personnel de Gérard Jonathan Iahli Gong-Non Moundou, étudiant en Classes Préparatoires aux Grandes Écoles (CPGE) à EPF Africa Dakar.",
    url: siteUrl,
    siteName: "Portfolio — Gérard Jonathan Moundou",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/profil.png",
        width: 1200,
        height: 630,
        alt: "Gérard Jonathan Iahli Gong-Non Moundou — Étudiant en CPGE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gérard Jonathan Iahli Gong-Non Moundou — Étudiant en CPGE",
    description:
      "Portfolio personnel de Gérard Jonathan Iahli Gong-Non Moundou, étudiant en CPGE à EPF Africa Dakar.",
    images: ["/images/profil.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Gérard Jonathan Iahli Gong-Non Moundou",
      alternateName: ["Gérard Jonathan Moundou", "Gérard Moundou"],
      jobTitle: "Étudiant en Classes Préparatoires aux Grandes Écoles (CPGE)",
      description:
        "Étudiant en Classes Préparatoires aux Grandes Écoles (CPGE) à EPF Africa Dakar.",
      url: siteUrl,
      image: `${siteUrl}/images/profil.png`,
      email: "gongnongerard05@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dakar",
        addressCountry: "Sénégal",
      },
      affiliation: {
        "@type": "EducationalOrganization",
        name: "EPF Africa Dakar",
      },
      knowsAbout: [
        "Mathématiques",
        "Physique",
        "Sciences de l'Ingénieur",
        "Informatique",
        "Méthodologie scientifique"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Portfolio — Gérard Jonathan Iahli Gong-Non Moundou",
      description: "Portfolio personnel de Gérard Jonathan Iahli Gong-Non Moundou",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "fr-FR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');var theme=t==='dark'?'dark':'light';document.documentElement.setAttribute('data-theme',theme);}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
