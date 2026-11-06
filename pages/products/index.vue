<script setup lang="ts">
const { data: products } = await useFetch('/api/products')
const siteUrl = useRuntimeConfig().public.siteUrl

const categories = ['all', 'rings', 'necklaces', 'earrings', 'bracelets']
const active = ref('all')
const visible = computed(() =>
  (products.value ?? []).filter((p) => active.value === 'all' || p.category === active.value),
)

useSeoMeta({
  title: 'Shop Jewellery in Kenya: Rings, Necklaces, Earrings | Lumi',
  description: 'Browse all Lumi jewellery: gold-plated and sterling silver rings, necklaces, earrings and bracelets, priced in KES.',
  ogTitle: 'Shop all jewellery | Lumi',
  ogDescription: 'Rings, necklaces, earrings and bracelets in KES.',
  ogImage: `${siteUrl}/images/hero.jpg`,
  ogUrl: `${siteUrl}/products`,
  twitterCard: 'summary_large_image',
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/products` }] })
</script>

<template>
  <div>
    <h1 class="font-display text-3xl">All jewellery</h1>
    <div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      <button
        v-for="c in categories"
        :key="c"
        type="button"
        :aria-pressed="active === c"
        class="rounded-full px-4 py-1.5 text-sm capitalize ring-1 ring-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
        :class="active === c ? 'bg-ink text-white' : 'bg-white hover:bg-ink/5'"
        @click="active = c"
      >
        {{ c }}
      </button>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard v-for="p in visible" :key="p.slug" :product="p" />
    </div>
  </div>
</template>
