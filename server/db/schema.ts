import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  priceKes: integer('price_kes').notNull(),
  category: text('category').notNull(), // rings, necklaces, earrings, bracelets
  image: text('image').notNull(),
  inStock: boolean('in_stock').notNull().default(true),
})

export type Product = typeof products.$inferSelect
