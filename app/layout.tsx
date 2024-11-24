import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import cosmic from "./cosmic";
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
    .props("metadata.site_title,metadata.site_description");
  return {
    title: object.metadata.site_title,
    description: object.metadata.site_description,
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
