// app/layout.tsx

'use client';

import Header from "@/components/Header";




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

         <Header/>
          <main>{children}</main>
   
      </body>
    </html>
  );
}
