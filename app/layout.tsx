import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import cosmic from "@/lib/cosmic";
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

export const generateMetadata = async () => {
  const { object } = await cosmic.objects
    .findOne({ type: "site-settings", slug: "site-settings" })
    .props("metadata.site_title,metadata.site_description,metadata.favicon");
  return {
    title: object.metadata.site_title,
    description: object.metadata.site_description,
    icons: {
      icon: object.metadata.favicon.imgix_url,
    },
  };
};

export const revalidate = 60;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-black text-white text-center py-2 text-sm">
          This is a template for a wedding website powered by the Cosmic CMS.
          Install it in your own Cosmic project from the{" "}
          <a
            href="https://www.cosmicjs.com/templates/wedding-website"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            Wedding Website template page on Cosmic
          </a>
          .
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
