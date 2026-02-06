# Cross-Zone Server Action Redirect Bug — Reproduction

## Bug

`redirect()` in a server action fails when the target path is served by a different Next.js zone (separate Vercel project) on the same domain.

The server action pre-fetches the redirect target with `RSC:1` header → the rewrite proxies it to the other zone → the other zone returns an RSC payload with a **different build ID** → the client receives a foreign RSC payload → **blank page**.

Normal `<a>` links work correctly because they trigger a full page load (MPA navigation).

## Architecture

```
Browser → repro-main-app.vercel.app
            ├── /*           → main-app
            └── /checkout/*  → rewrites to repro-checkout-app.vercel.app/checkout/*

repro-checkout-app.vercel.app
            └── /checkout/*  → checkout-app (assetPrefix: /checkout-static)
```

Two separate Vercel projects from one monorepo. Standard [Next.js Multi-Zones](https://nextjs.org/docs/pages/guides/multi-zones) pattern.

## Deployment

### 1. Push to GitHub

### 2. Create two Vercel projects

| Setting | Main App | Checkout App |
|---------|----------|--------------|
| **Project name** | `repro-main-app` | `repro-checkout-app` |
| **Root directory** | `main-app` | `checkout-app` |
| **Framework** | Next.js | Next.js |

### 3. Set env var on main app

```
CHECKOUT_URL = https://repro-checkout-app.vercel.app
```

### 4. Deploy both projects

### 5. Verify setup

1. `https://repro-main-app.vercel.app/` → Main App home
2. `https://repro-main-app.vercel.app/checkout` → Checkout page via rewrite
3. `https://repro-checkout-app.vercel.app/checkout` → Checkout page directly

## Reproduce the Bug

1. Open `https://repro-main-app.vercel.app/test-redirect`
2. Click **green link** → Checkout page renders ✅
3. Go back to `/test-redirect`
4. Click **red button** → **Blank page** ❌

## DevTools Inspection

On the red button click, check the Network tab for the server action POST:

- Response has `content-type: text/x-component`
- Response body contains RSC payload from checkout-app's build (wrong build ID)
- URL shows `/checkout` but nothing renders

## Local Testing

```bash
# Terminal 1
cd main-app && npm install && npm run build && npm start

# Terminal 2
cd checkout-app && npm install && npm run build && npm start
```

Open `http://localhost:3000/test-redirect`. Must use production mode (`next build && next start`).
