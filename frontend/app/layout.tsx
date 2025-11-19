import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import Chatbot from "@/components/chatbot/Chatbot";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "SecureBank - Modern Banking Solutions",
  description: "Experience the future of banking with 3D interactive interface and AI-powered assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        <Navigation />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
