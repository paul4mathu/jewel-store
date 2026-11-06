import { asc } from 'drizzle-orm'
import { db } from '../../db'
import { products } from '../../db/schema'

export default defineEventHandler(async () => {
  return await db.select().from(products).orderBy(asc(products.id))
})
