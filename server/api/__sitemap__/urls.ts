import { db } from '../../db'
import { products } from '../../db/schema'

export default defineSitemapEventHandler(async () => {
  const rows = await db.select({ slug: products.slug }).from(products)
  return rows.map((r) => ({ loc: `/products/${r.slug}`, changefreq: 'weekly' as const, priority: 0.8 }))
})
