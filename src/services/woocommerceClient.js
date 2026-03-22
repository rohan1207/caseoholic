/**
 * WooCommerce reads via dev proxy (`/api/wc/*`). Secrets stay in `server/wc-proxy.cjs`.
 * Cart/checkout: this app uses **local React cart** + **REST POST /orders** (checkout-order) or
 * **hybrid** link to WordPress checkout. Full Store API cart sync can be added later (nonce/cookies).
 */
import { getWooCommerceApiBase } from '../config/woocommerce.js'

async function request(path, options = {}) {
  const base = getWooCommerceApiBase()
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    let err
    try {
      err = JSON.parse(text)
    } catch {
      err = { message: text || res.statusText }
    }
    throw new Error(err.message || err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export async function fetchProductsByCategory(categorySlug, { perPage = 24, page = 1 } = {}) {
  const q = new URLSearchParams({ per_page: String(perPage), page: String(page) })
  if (categorySlug) q.set('category', categorySlug)
  return request(`/products?${q.toString()}`)
}

export async function fetchProductBySlug(slug) {
  const data = await request(`/products/by-slug/${encodeURIComponent(slug)}`)
  return data
}

export async function fetchCategories(parent = null) {
  const q = parent !== null ? `?parent=${parent}` : ''
  return request(`/categories${q}`)
}

export async function fetchOrdersForCustomer(customerId) {
  return request(`/orders?customer=${encodeURIComponent(String(customerId))}`)
}

export async function jwtLogin(username, password) {
  const url = `${getWooCommerceApiBase()}/jwt-login`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || data.error || 'Login failed')
  return data
}

export async function fetchCustomerByEmail(email) {
  const q = new URLSearchParams({ email })
  return request(`/customers/by-email?${q.toString()}`)
}

/**
 * Create a WooCommerce order server-side (proxy uses REST keys).
 * @param {object} payload — WC REST order body (billing, line_items, payment_method, etc.)
 */
export async function createCheckoutOrder(payload) {
  const base = getWooCommerceApiBase()
  const url = `${base}/checkout-order`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || data.error || data.code || `HTTP ${res.status}`)
  return data
}
