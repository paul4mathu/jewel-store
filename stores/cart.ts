import { defineStore } from 'pinia'

export interface CartItem {
  slug: string
  name: string
  priceKes: number
  image: string
  qty: number
}

const KEY = 'lumi-cart'

export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as CartItem[] }),
  getters: {
    count: (s) => s.items.reduce((n, i) => n + i.qty, 0),
    total: (s) => s.items.reduce((n, i) => n + i.qty * i.priceKes, 0),
  },
  actions: {
    // Called on the client after mount, so server and client HTML match (no hydration warnings)
    hydrate() {
      try {
        const raw = localStorage.getItem(KEY)
        if (raw) this.items = JSON.parse(raw)
      } catch {}
    },
    persist() {
      try {
        localStorage.setItem(KEY, JSON.stringify(this.items))
      } catch {}
    },
    add(item: Omit<CartItem, 'qty'>) {
      const found = this.items.find((i) => i.slug === item.slug)
      if (found) found.qty++
      else this.items.push({ ...item, qty: 1 })
      this.persist()
    },
    setQty(slug: string, qty: number) {
      const found = this.items.find((i) => i.slug === slug)
      if (!found) return
      if (qty <= 0) this.remove(slug)
      else {
        found.qty = qty
        this.persist()
      }
    },
    remove(slug: string) {
      this.items = this.items.filter((i) => i.slug !== slug)
      this.persist()
    },
    clear() {
      this.items = []
      this.persist()
    },
  },
})
