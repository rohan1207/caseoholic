/**
 * WooCommerce feature flags and API base URL.
 * Catalog reads go through /api/wc/* (Vite proxies to wc-proxy.cjs in dev).
 */

export function isWooCommerceEnabled() {
  return import.meta.env.VITE_USE_WOOCOMMERCE === 'true'
}

/** Base for proxied WooCommerce API (same origin in dev). */
export function getWooCommerceApiBase() {
  const base = import.meta.env.VITE_WC_API_BASE || '/api/wc'
  return base.replace(/\/$/, '')
}

export function getWordPressSiteUrl() {
  return (import.meta.env.VITE_WORDPRESS_URL || '').replace(/\/$/, '')
}

/** Hybrid checkout: full URL to WordPress checkout page */
export function getCheckoutUrl() {
  const wp = getWordPressSiteUrl()
  const path = import.meta.env.VITE_WP_CHECKOUT_PATH || '/checkout/'
  if (!wp) return ''
  return `${wp}${path.startsWith('/') ? path.slice(1) : path}`
}

/** Pay for a specific order on WordPress (after REST order creation). */
export function getOrderPayUrl(order) {
  const wp = getWordPressSiteUrl()
  if (!wp || !order?.id || !order?.order_key) return ''
  const base = wp.replace(/\/$/, '')
  return `${base}/checkout/order-pay/${order.id}/?pay_for_order=true&key=${encodeURIComponent(order.order_key)}`
}
