import { redirectToCheckout } from './actions'

export default function TestRedirect() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Test: Server Action Redirect to Checkout Zone</h1>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        {/* BUG: Server action redirect to path served by different zone */}
        <form action={redirectToCheckout}>
          <button type="submit" style={{
            padding: '1rem 2rem', fontSize: '1rem', cursor: 'pointer',
            background: '#dc3545', color: 'white', border: 'none', borderRadius: '6px'
          }}>
            BUG: Server Action redirect('/checkout')
          </button>
        </form>

        {/* CONTROL: Normal link — should always trigger hard navigation */}
        <a href="/checkout" style={{
          padding: '1rem 2rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center',
          background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '6px'
        }}>
          OK: Normal &lt;a&gt; link to /checkout
        </a>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '6px' }}>
        <strong>Expected behavior:</strong>
        <ul style={{ margin: '0.5rem 0 0' }}>
          <li><strong>Red button:</strong> Should navigate to checkout page — but shows blank page (bug)</li>
          <li><strong>Green link:</strong> Hard navigates to checkout page — works correctly</li>
        </ul>
      </div>
    </div>
  )
}
