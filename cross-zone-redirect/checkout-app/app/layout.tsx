export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav style={{ padding: '1rem', background: '#d4edda', borderBottom: '1px solid #28a745' }}>
          <strong>Checkout App (separate zone)</strong>{' | '}
          <a href="/">Back to Main</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
