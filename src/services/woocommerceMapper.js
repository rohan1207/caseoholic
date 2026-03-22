/**
 * Map WooCommerce REST product + variations to the shape used by ProductCard / ProductPage.
 */

function pickImages(product) {
  const imgs = product.images || []
  return imgs.map((i) => i.src).filter(Boolean)
}

function variationLabel(variation) {
  const attrs = variation.attributes || []
  if (!attrs.length) return 'Default'
  return attrs
    .map((a) => {
      const val = a.option ?? a.value ?? ''
      return val
    })
    .filter(Boolean)
    .join(' · ')
}

/**
 * @param {object} product — WC product object
 * @param {object[]} variations — WC variation objects (from /products?include=...)
 */
export function mapVariableProduct(product, variations = []) {
  const images = pickImages(product)
  const mappedVariations = variations.map((v) => ({
    id: v.id,
    price: parseFloat(v.price) || 0,
    regularPrice: v.regular_price ? parseFloat(v.regular_price) : null,
    sku: v.sku || '',
    stockStatus: v.stock_status || 'instock',
    image: v.image?.src ? v.image.src : images[0] || '',
    label: variationLabel(v, product.attributes),
    raw: v,
  }))

  const prices = mappedVariations.map((v) => v.price).filter((n) => n > 0)
  const minPrice = prices.length ? Math.min(...prices) : parseFloat(product.price) || 0

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    shortDescription: product.short_description?.replace(/<[^>]+>/g, '') || '',
    description: product.description || '',
    type: product.type,
    wcProductId: product.id,
    tagline: product.short_description?.replace(/<[^>]+>/g, '').slice(0, 120) || '',
    badge: null,
    rating: parseFloat(product.average_rating) || 0,
    reviewCount: parseInt(product.rating_count, 10) || 0,
    price: minPrice,
    comparePrice: product.on_sale && product.regular_price ? parseFloat(product.regular_price) : null,
    images: images.length ? images : ['/placeholder-product.webp'],
    colors: [],
    material: '',
    features: [],
    category: 'all',
    subcategory: null,
    deviceBrand: null,
    collection: '',
    isBestseller: false,
    isNewArrival: product.date_created
      ? new Date(product.date_created) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      : false,
    compatibleWith: [],
    variations: mappedVariations,
    wcVariations: variations,
    source: 'woocommerce',
  }
}

export function mapSimpleProduct(product) {
  const images = pickImages(product)
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    shortDescription: product.short_description?.replace(/<[^>]+>/g, '') || '',
    description: product.description || '',
    type: product.type || 'simple',
    wcProductId: product.id,
    tagline: '',
    badge: null,
    rating: parseFloat(product.average_rating) || 0,
    reviewCount: parseInt(product.rating_count, 10) || 0,
    price: parseFloat(product.price) || 0,
    comparePrice: product.on_sale && product.regular_price ? parseFloat(product.regular_price) : null,
    images: images.length ? images : ['/placeholder-product.webp'],
    colors: [],
    material: '',
    features: [],
    category: 'all',
    subcategory: null,
    deviceBrand: null,
    collection: '',
    isBestseller: false,
    isNewArrival: false,
    compatibleWith: [],
    variations: [],
    wcVariations: [],
    source: 'woocommerce',
  }
}

export function mapProductFromApi({ product, variations }) {
  if (product.type === 'variable') {
    return mapVariableProduct(product, variations || [])
  }
  return mapSimpleProduct(product)
}

/** Minimal map for category grid cards (list endpoint). */
export function mapProductListItem(product) {
  const images = (product.images || []).map((i) => i.src).filter(Boolean)
  const base = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    badge: null,
    rating: parseFloat(product.average_rating) || 0,
    reviewCount: parseInt(product.rating_count, 10) || 0,
    price: parseFloat(product.price) || 0,
    comparePrice: product.on_sale && product.regular_price ? parseFloat(product.regular_price) : null,
    images: images.length ? images : ['/placeholder-product.webp'],
    colors: [],
    collection: '',
    wcProductId: product.id,
    source: 'woocommerce',
  }
  return base
}
