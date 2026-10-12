import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

export const metadata = {
  title: "CreatorX: match brands with creators who create value",
  description: "Explainable creator and brand matching based on audience, niche and genuine engagement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
