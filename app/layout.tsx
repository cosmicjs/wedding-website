import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import cosmic, { getHomePage } from "@/lib/cosmic";
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
  const homePage = await getHomePage();
  const { object } = await cosmic.objects
    .findOne({ type: "site-settings", slug: "site-settings" })
    .props("metadata.site_title,metadata.site_description,metadata.favicon");
  return {
    title: object.metadata.site_title,
    description: object.metadata.site_description,
    icons: {
      icon: object.metadata.favicon.imgix_url,
    },
    images: [`${homePage.metadata.main_image.imgix_url}?w=1200&auto=compress`],
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
