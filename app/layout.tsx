import type { Metadata } from "next";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hướng dẫn sử dụng | SquareHub",
  description:
    "Trung tâm trợ giúp SquareHub — hướng dẫn, bài viết và câu trả lời giúp bạn quản lý hội thoại với khách hàng.",
  icons: {
    icon: "/assets/images/apple-icon.png",
    shortcut: "/assets/images/apple-icon.png",
    apple: "/assets/images/apple-icon.png",
  },
};

// Set the theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{if(localStorage.theme==='dark'||(!('theme' in localStorage)&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-inter">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
