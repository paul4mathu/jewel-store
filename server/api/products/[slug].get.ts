import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { products } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
  return product
})
