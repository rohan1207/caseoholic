/**
 * Unified catalog: WooCommerce API when enabled, else static data/products.js
 */
import {
  PRODUCTS,
  getProductBySlug as getLocalProductBySlug,
  getProductsByCategory as getLocalProductsByCategory,
  getRelatedProducts as getLocalRelatedProducts,
  searchProducts as searchLocalProducts,
} from '../data/products.js'
import { isWooCommerceEnabled } from '../config/woocommerce.js'
import { fetchProductsByCategory, fetchProductBySlug } from '../services/woocommerceClient.js'
import { mapProductFromApi, mapProductListItem } from '../services/woocommerceMapper.js'

/** Map React route category slug → WooCommerce product category slug (configure in .env if different). */
export function getWooCategorySlug(reactCategorySlug) {
  const raw = import.meta.env.VITE_WC_CATEGORY_SLUG_MAP
  if (!raw) return reactCategorySlug
  try {
    const map = JSON.parse(raw)
    return map[reactCategorySlug] ?? reactCategorySlug
  } catch {
    return reactCategorySlug
  }
}

export async function loadProductsForCategory(reactCategorySlug) {
  if (!isWooCommerceEnabled()) {
    return getLocalProductsByCategory(reactCategorySlug)
  }
  const wcSlug =
    reactCategorySlug === 'all' ? '' : getWooCategorySlug(reactCategorySlug) || reactCategorySlug
  const wcProducts = await fetchProductsByCategory(wcSlug, { perPage: 48 })
  if (!Array.isArray(wcProducts) || wcProducts.length === 0) {
    return getLocalProductsByCategory(reactCategorySlug)
  }
  return wcProducts.map(mapProductListItem)
}

export async function loadProductBySlug(slug) {
  if (!isWooCommerceEnabled()) {
    return getLocalProductBySlug(slug)
  }
  try {
    const data = await fetchProductBySlug(slug)
    if (!data?.product) return getLocalProductBySlug(slug)
    return mapProductFromApi(data)
  } catch {
    return getLocalProductBySlug(slug)
  }
}

export async function loadRelatedProducts(product, limit = 4) {
  if (!isWooCommerceEnabled() || product.source !== 'woocommerce') {
    return getLocalRelatedProducts(product, limit)
  }
  try {
    const wcSlug = getWooCategorySlug(product.category) || product.category || 'all'
    const list = await fetchProductsByCategory(wcSlug, { perPage: limit + 4 })
    const mapped = (Array.isArray(list) ? list : [])
      .filter((p) => p.slug !== product.slug)
      .slice(0, limit)
      .map(mapProductListItem)
    return mapped.length ? mapped : getLocalRelatedProducts(product, limit)
  } catch {
    return getLocalRelatedProducts(product, limit)
  }
}

export async function searchCatalog(query) {
  if (!isWooCommerceEnabled()) return searchLocalProducts(query)
  const q = query.trim().toLowerCase()
  if (!q) return []
  try {
    const all = await fetchProductsByCategory('', { perPage: 100 })
    const arr = Array.isArray(all) ? all : []
    return arr
      .filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.slug?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q)
      )
      .map(mapProductListItem)
  } catch {
    return searchLocalProducts(query)
  }
}

export { PRODUCTS, getLocalProductBySlug as getProductBySlugSync }
