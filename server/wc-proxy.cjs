/**
 * Development proxy for WooCommerce REST API — keeps consumer keys off the browser bundle.
 * Run: node server/wc-proxy.cjs  (default port 5000 — matches Vite proxy in vite.config.js)
 *
 * Required env (e.g. in .env next to this file or exported in shell):
 *   WC_SITE_URL=https://your-site.com
 *   WC_CONSUMER_KEY=ck_...
 *   WC_CONSUMER_SECRET=cs_...
 */

const http = require('http')
const https = require('https')
const { URL } = require('url')

const PORT = Number(process.env.WC_PROXY_PORT || 5000)
const WC_SITE_URL = (process.env.WC_SITE_URL || '').replace(/\/$/, '')
const CK = process.env.WC_CONSUMER_KEY || ''
const CS = process.env.WC_CONSUMER_SECRET || ''

function wcRequest(pathWithQuery, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    if (!WC_SITE_URL || !CK || !CS) {
      reject(new Error('WC_SITE_URL, WC_CONSUMER_KEY, and WC_CONSUMER_SECRET must be set'))
      return
    }
    const url = new URL(WC_SITE_URL + '/wp-json/wc/v3' + pathWithQuery)
    url.searchParams.set('consumer_key', CK)
    url.searchParams.set('consumer_secret', CS)

    const lib = url.protocol === 'https:' ? https : http
    const opts = {
      method,
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {}),
      },
    }

    const req = lib.request(opts, (res) => {
      let data = ''
      res.on('data', (c) => (data += c))
      res.on('end', () => {
        try {
          const json = data ? JSON.parse(data) : null
          resolve({ status: res.statusCode, json, raw: data })
        } catch {
          resolve({ status: res.statusCode, json: null, raw: data })
        }
      })
    })
    req.on('error', reject)
    if (body) req.write(body)
    req.end()
  })
}

/** WC REST expects numeric category IDs; resolve slug → id when needed. */
async function resolveCategoryId(slugOrId) {
  const s = String(slugOrId || '').trim()
  if (!s) return ''
  if (/^\d+$/.test(s)) return s
  try {
    const { json } = await wcRequest(`/products/categories?slug=${encodeURIComponent(s)}&per_page=1`)
    const list = Array.isArray(json) ? json : []
    return list[0]?.id != null ? String(list[0].id) : ''
  } catch {
    return ''
  }
}

async function handle(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  const url = new URL(req.url || '/', `http://${req.headers.host}`)

  try {
    if (url.pathname === '/api/wc/health') {
      const ok = !!(WC_SITE_URL && CK && CS)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok, hasConfig: ok }))
      return
    }

    // GET /api/wc/products?category=slug&per_page=20&page=1
    if (req.method === 'GET' && url.pathname === '/api/wc/products') {
      const category = url.searchParams.get('category') || ''
      const perPage = url.searchParams.get('per_page') || '20'
      const page = url.searchParams.get('page') || '1'
      let path = `/products?per_page=${encodeURIComponent(perPage)}&page=${encodeURIComponent(page)}&status=publish`
      if (category) {
        const cid = await resolveCategoryId(category)
        if (cid) path += `&category=${encodeURIComponent(cid)}`
      }
      const { status, json } = await wcRequest(path)
      res.writeHead(status || 500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(json ?? { error: 'Invalid response' }))
      return
    }

    // GET /api/wc/products/by-slug/:slug
    const slugMatch = url.pathname.match(/^\/api\/wc\/products\/by-slug\/([^/]+)\/?$/)
    if (req.method === 'GET' && slugMatch) {
      const slug = decodeURIComponent(slugMatch[1])
      const { status, json } = await wcRequest(`/products?slug=${encodeURIComponent(slug)}&per_page=1`)
      const list = Array.isArray(json) ? json : []
      if (!list.length) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Product not found' }))
        return
      }
      const product = list[0]
      let variations = []
      if (product.type === 'variable' && Array.isArray(product.variations) && product.variations.length) {
        const ids = product.variations.join(',')
        const vres = await wcRequest(`/products?include=${ids}&per_page=100`)
        variations = Array.isArray(vres.json) ? vres.json : []
      }
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ product, variations }))
      return
    }

    // GET /api/wc/categories?parent=0
    if (req.method === 'GET' && url.pathname === '/api/wc/categories') {
      const parent = url.searchParams.get('parent')
      let path = '/products/categories?per_page=100'
      if (parent !== null) path += `&parent=${encodeURIComponent(parent)}`
      const { status, json } = await wcRequest(path)
      res.writeHead(status || 500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(json ?? []))
      return
    }

    // GET /api/wc/customers/by-email?email= — resolve WooCommerce customer id (dev; protect in production)
    if (req.method === 'GET' && url.pathname === '/api/wc/customers/by-email') {
      const email = url.searchParams.get('email') || ''
      if (!email) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'email query param required' }))
        return
      }
      const { status, json } = await wcRequest(`/customers?email=${encodeURIComponent(email)}&per_page=1`)
      const list = Array.isArray(json) ? json : []
      const customer = list[0] || null
      res.writeHead(status || 200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ customer }))
      return
    }

    // POST /api/wc/checkout-order — create pending order (line_items from React cart); redirect client to order-pay URL
    if (req.method === 'POST' && url.pathname === '/api/wc/checkout-order') {
      let body = ''
      for await (const chunk of req) body += chunk
      const { status, json } = await wcRequest('/orders', 'POST', body)
      res.writeHead(status || 500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(json ?? { error: 'Failed to create order' }))
      return
    }

    // GET /api/wc/orders?customer=123 — uses server consumer key (scope this to your customer IDs only)
    if (req.method === 'GET' && url.pathname === '/api/wc/orders') {
      const customer = url.searchParams.get('customer')
      if (!customer) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Query param customer (WooCommerce customer id) required' }))
        return
      }
      const { status, json } = await wcRequest(`/orders?per_page=20&customer=${encodeURIComponent(customer)}`)
      res.writeHead(status || 500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(json ?? []))
      return
    }

    // POST /api/wc/jwt-login — forward to WordPress JWT plugin (body: { username, password })
    if (req.method === 'POST' && url.pathname === '/api/wc/jwt-login') {
      let body = ''
      for await (const chunk of req) body += chunk
      const siteUrl = new URL(WC_SITE_URL)
      const lib = siteUrl.protocol === 'https:' ? https : http
      const path = '/wp-json/jwt-auth/v1/token'
      await new Promise((resolve, reject) => {
        const r = lib.request(
          {
            method: 'POST',
            hostname: siteUrl.hostname,
            port: siteUrl.port || (siteUrl.protocol === 'https:' ? 443 : 80),
            path,
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(body),
            },
          },
          (out) => {
            let d = ''
            out.on('data', (c) => (d += c))
            out.on('end', () => {
              res.writeHead(out.statusCode || 500, { 'Content-Type': 'application/json' })
              res.end(d)
              resolve()
            })
          }
        )
        r.on('error', reject)
        r.write(body)
        r.end()
      })
      return
    }

    // POST /api/wc/orders — create order (server-side only; uses store keys)
    if (req.method === 'POST' && url.pathname === '/api/wc/orders') {
      let body = ''
      for await (const chunk of req) body += chunk
      const { status, json } = await wcRequest('/orders', 'POST', body)
      res.writeHead(status || 500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(json ?? { error: 'Failed' }))
      return
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  } catch (e) {
    console.error('[wc-proxy]', e)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: String(e.message || e) }))
  }
}

http.createServer(handle).listen(PORT, () => {
  console.log(`[wc-proxy] listening on http://localhost:${PORT}`)
  if (!WC_SITE_URL || !CK || !CS) {
    console.warn('[wc-proxy] Warning: WC_SITE_URL / WC_CONSUMER_KEY / WC_CONSUMER_SECRET not fully set')
  }
})
