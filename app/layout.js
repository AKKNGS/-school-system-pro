
export const metadata = {
  title: "School System Pro Ultra",
  description: "Production School Management System"
}

export default function RootLayout({ children }) {
  return (
    <html lang="km">
      <body style={{fontFamily:"Kantumruy, sans-serif",margin:0,background:"#f6f7fb"}}>
        {children}
      </body>
    </html>
  )
}
