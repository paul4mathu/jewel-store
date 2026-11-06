<script setup lang="ts">
const cart = useCartStore()
useSeoMeta({ title: 'Your cart | Lumi', robots: 'noindex, nofollow' })
</script>

<template>
  <div>
    <h1 class="font-display text-3xl">Your cart</h1>
    <div v-if="!cart.items.length" class="mt-6">
      <p>Your cart is empty.</p>
      <NuxtLink to="/products" class="mt-4 inline-block underline">Browse the shop</NuxtLink>
    </div>
    <div v-else class="mt-6 grid gap-8 md:grid-cols-3">
      <ul class="space-y-4 md:col-span-2">
        <li v-for="i in cart.items" :key="i.slug" class="flex gap-4 rounded-lg bg-white p-4 ring-1 ring-ink/5">
          <NuxtImg :src="i.image" :alt="i.name" width="96" height="96" loading="lazy" class="h-24 w-24 rounded object-cover" />
          <div class="flex-1">
            <NuxtLink :to="`/products/${i.slug}`" class="font-display text-lg hover:underline">{{ i.name }}</NuxtLink>
            <p class="text-sm text-ink/70">{{ formatKes(i.priceKes) }}</p>
            <div class="mt-2 flex items-center gap-2">
              <button type="button" :aria-label="`Decrease quantity of ${i.name}`" class="h-8 w-8 rounded ring-1 ring-ink/20" @click="cart.setQty(i.slug, i.qty - 1)">-</button>
              <span aria-live="polite" class="w-6 text-center">{{ i.qty }}</span>
              <button type="button" :aria-label="`Increase quantity of ${i.name}`" class="h-8 w-8 rounded ring-1 ring-ink/20" @click="cart.setQty(i.slug, i.qty + 1)">+</button>
              <button type="button" class="ml-4 text-sm text-garnet underline" @click="cart.remove(i.slug)">Remove</button>
            </div>
          </div>
          <p class="font-medium">{{ formatKes(i.priceKes * i.qty) }}</p>
        </li>
      </ul>
      <aside class="h-fit rounded-lg bg-white p-6 ring-1 ring-ink/5">
        <h2 class="font-display text-xl">Order summary</h2>
        <p class="mt-4 flex justify-between"><span>Total</span><strong>{{ formatKes(cart.total) }}</strong></p>
        <NuxtLink to="/checkout" class="mt-6 block rounded-full bg-ink py-3 text-center text-white hover:bg-garnet">Go to checkout</NuxtLink>
      </aside>
    </div>
  </div>
</template>
