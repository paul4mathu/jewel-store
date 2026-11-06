import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { products } from '../server/db/schema'
import data from './products.json' with { type: 'json' }

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle(client)

await db.delete(products)
await db.insert(products).values(data.map((p) => ({ ...p, image: `/images/${p.slug}.jpg` })))
console.log(`Seeded ${data.length} products`)
await client.end()
