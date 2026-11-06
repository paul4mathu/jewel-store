<script setup lang="ts">
const cart = useCartStore()
useSeoMeta({ title: 'Checkout | Lumi', robots: 'noindex, nofollow' })

const form = reactive({ name: '', email: '', phone: '' })
const placing = ref(false)

async function placeOrder() {
  placing.value = true
  // Mocked checkout: no payment or order is stored
  await new Promise((r) => setTimeout(r, 600))
  const orderRef = `LUMI-${Date.now().toString().slice(-6)}`
  cart.clear()
  await navigateTo({ path: '/order-confirmed', query: { ref: orderRef } })
}
</script>

<template>
  <div>
    <h1 class="font-display text-3xl">Checkout</h1>
    <div v-if="!cart.items.length" class="mt-6">
      <p>Your cart is empty.</p>
      <NuxtLink to="/products" class="mt-4 inline-block underline">Browse the shop</NuxtLink>
    </div>
    <form v-else class="mt-6 grid max-w-lg gap-4" @submit.prevent="placeOrder">
      <label class="grid gap-1 text-sm">Full name
        <input v-model="form.name" required autocomplete="name" class="rounded border border-ink/20 bg-white px-3 py-2" />
      </label>
      <label class="grid gap-1 text-sm">Email
        <input v-model="form.email" type="email" required autocomplete="email" class="rounded border border-ink/20 bg-white px-3 py-2" />
      </label>
      <label class="grid gap-1 text-sm">Phone (M-Pesa number)
        <input v-model="form.phone" type="tel" required autocomplete="tel" class="rounded border border-ink/20 bg-white px-3 py-2" />
      </label>
      <p class="text-sm text-ink/70">This is a demo checkout. No payment is taken.</p>
      <button type="submit" :disabled="placing" class="rounded-full bg-ink py-3 text-white hover:bg-garnet disabled:opacity-50">
        {{ placing ? 'Placing order...' : `Place order, ${formatKes(cart.total)}` }}
      </button>
    </form>
  </div>
</template>
