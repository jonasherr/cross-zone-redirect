'use server'

import { redirect } from 'next/navigation'

export async function redirectToCheckout() {
  // BUG TRIGGER:
  //
  // redirect() with a "/" path → action-handler.ts treats as "app-relative"
  // → server pre-fetches /checkout with RSC:1 header
  // → rewrite sends it to checkout-app (different build)
  // → checkout-app returns RSC payload with its own build ID
  // → server streams foreign RSC payload to client
  // → client applies it without build ID check
  // → corrupted router state → blank page
  redirect('/checkout')
}
