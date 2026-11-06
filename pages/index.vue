<script setup lang="ts">
const { data: products } = await useFetch('/api/products')
const featured = computed(() => (products.value ?? []).filter((p) => p.inStock).slice(0, 4))
const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: 'Lumi Jewellery | Rings, Necklaces & Earrings in Nairobi, Kenya',
  description: 'Shop everyday gold and silver jewellery in Kenya. Rings, necklaces, earrings and bracelets in KES, made to be worn daily.',
  ogTitle: 'Lumi Jewellery | Everyday gold and silver jewellery',
  ogDescription: 'Rings, necklaces, earrings and bracelets in KES.',
  ogImage: `${siteUrl}/images/hero.jpg`,
  ogUrl: siteUrl,
  twitterCard: 'summary_large_image',
})
useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: 'Lumi Jewellery',
        url: siteUrl,
        image: `${siteUrl}/images/hero.jpg`,
        address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden rounded-lg bg-ink text-white">
      <!-- Hero is above the fold: eager loading and high fetch priority, not lazy -->
      <NuxtImg
        src="/images/hero.jpg"
        alt="Gold rings and necklaces on a dark background"
        width="1200"
        height="600"
        sizes="100vw md:1200px"
        loading="eager"
        fetchpriority="high"
        class="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div class="relative px-6 py-20 md:py-28">
        <h1 class="max-w-xl font-display text-4xl leading-tight md:text-5xl">Jewellery made to be worn every day</h1>
        <p class="mt-4 max-w-md text-white/80">Gold-plated and sterling silver pieces, priced in shillings and delivered across Kenya.</p>
        <NuxtLink to="/products" class="mt-8 inline-block rounded-full bg-brass px-6 py-3 font-medium text-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
          Shop the collection
        </NuxtLink>
      </div>
    </section>

    <section class="mt-12" aria-labelledby="featured">
      <h2 id="featured" class="font-display text-2xl">New this week</h2>
      <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <ProductCard v-for="p in featured" :key="p.slug" :product="p" />
      </div>
    </section>
  </div>
</template>
