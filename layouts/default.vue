<script setup lang="ts">
const cart = useCartStore()
const mounted = ref(false)
onMounted(() => {
  cart.hydrate()
  mounted.value = true
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-pearl text-ink">
    <header class="border-b border-ink/10 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NuxtLink to="/" class="font-display text-2xl tracking-wide">Lumi</NuxtLink>
        <nav aria-label="Main" class="flex items-center gap-6 text-sm">
          <NuxtLink to="/products" class="hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass">Shop</NuxtLink>
          <NuxtLink to="/cart" class="rounded-full bg-ink px-4 py-2 text-white hover:bg-garnet focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass">
            Cart<span v-if="mounted && cart.count"> ({{ cart.count }})</span>
          </NuxtLink>
        </nav>
      </div>
    </header>
    <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <slot />
    </main>
    <footer class="border-t border-ink/10 bg-white py-6 text-center text-sm text-ink/70">
      Lumi Jewellery, Nairobi.
    </footer>
  </div>
</template>
