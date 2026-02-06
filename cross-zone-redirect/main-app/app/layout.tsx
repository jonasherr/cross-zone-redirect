export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav style={{ padding: '1rem', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <strong>Main App</strong>{' | '}
          <a href="/">Home</a>{' | '}
          <a href="/test-redirect">Test Redirect</a>{' | '}
          <a href="/checkout">Checkout (normal link)</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
