import './globals.css'
import Sidebar from '../components/sidebar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}