import "./globals.css"

export const metadata = {
  title: "School System Pro Complete",
  description: "Next.js + Supabase School Management System"
}

export default function RootLayout({ children }) {
  return (
    <html lang="km">
      <body>{children}</body>
    </html>
  )
}
