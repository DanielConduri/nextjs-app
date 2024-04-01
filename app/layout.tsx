import '@/app/ui/global.css';
import { montserrat } from './ui/fonts';
  
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className={`${montserrat.className} antialiased`}>
      {/* Esto es parte del layout */}
      {/* <h1>Este titulo</h1>
      <div style={{border: '1px solid #000'}}> */}
      {/* el chilren es el page.tsx */}
      {children} 
      <footer className='py-10 flex justify-center'>
        Hecho con amor por vercel
      </footer>
     
      </body> 
    </html>
  );
}
