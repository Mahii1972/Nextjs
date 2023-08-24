import Sidebar from '@/components/Sidebar'
import '../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard V1',
  description: 'Powered by PredPoint Analytics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body className='bg-white-200  {inter.className}'>
        <div className='flex flex-row bg-gradient-to-r from-sky-50 to-indigo-50 min-h-screen'>
        <Sidebar/>
        <main className='basis-10/12'> {children} </main>
        </div>
        </body>
       
      
    </html>
  )
}
