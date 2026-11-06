<script setup lang="ts">
const route = useRoute()
const cart = useCartStore()
const siteUrl = useRuntimeConfig().public.siteUrl
const slug = route.params.slug as string

const { data: product } = await useFetch(`/api/products/${slug}`)
if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}

const p = product.value
const url = `${siteUrl}/products/${p.slug}`
const image = `${siteUrl}${p.image}`
const desc = p.description.length > 155 ? `${p.description.slice(0, 152)}...` : p.description

useSeoMeta({
  title: `${p.name} | Buy ${p.category.replace(/s$/, '')} in Kenya | Lumi`,
  description: desc,
  ogTitle: p.name,
  ogDescription: desc,
  ogImage: image,
  ogUrl: url,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        image: [image],
        description: p.description,
        sku: p.slug,
        category: p.category,
        brand: { '@type': 'Brand', name: 'Lumi' },
        offers: {
          '@type': 'Offer',
          url,
          priceCurrency: 'KES',
          price: p.priceKes,
          availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      }),
    },
  ],
})

const added = ref(false)
function addToCart() {
  cart.add({ slug: p.slug, name: p.name, priceKes: p.priceKes, image: p.image })
  added.value = true
}
</script>

<template>
  <div>
    <nav aria-label="Breadcrumb" class="text-sm text-ink/70">
      <NuxtLink to="/" class="hover:underline">Home</NuxtLink> /
      <NuxtLink to="/products" class="hover:underline">Shop</NuxtLink> /
      <span aria-current="page">{{ p.name }}</span>
    </nav>
    <div class="mt-6 grid gap-8 md:grid-cols-2">
      <NuxtImg
        :src="p.image"
        :alt="`${p.name}, ${p.category.replace(/s$/, '')}`"
        width="800"
        height="800"
        sizes="100vw md:50vw"
        loading="eager"
        fetchpriority="high"
        class="aspect-square w-full rounded-lg object-cover"
      />
      <div>
        <h1 class="font-display text-3xl">{{ p.name }}</h1>
        <p class="mt-2 text-xl text-garnet">{{ formatKes(p.priceKes) }}</p>
        <p class="mt-4 max-w-prose leading-relaxed text-ink/80">{{ p.description }}</p>
        <p class="mt-4 text-sm" :class="p.inStock ? 'text-ink/70' : 'text-garnet'">
          {{ p.inStock ? 'In stock' : 'Sold out' }}
        </p>
        <button
          type="button"
          :disabled="!p.inStock"
          class="mt-6 rounded-full bg-ink px-8 py-3 text-white hover:bg-garnet focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass disabled:cursor-not-allowed disabled:opacity-40"
          @click="addToCart"
        >
          Add to cart
        </button>
        <p v-if="added" role="status" class="mt-3 text-sm">
          Added. <NuxtLink to="/cart" class="underline">View cart</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
