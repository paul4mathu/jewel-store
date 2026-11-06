<script setup lang="ts">
defineProps<{
  product: { slug: string; name: string; priceKes: number; image: string; inStock: boolean; category: string }
}>()
</script>

<template>
  <article class="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-ink/5">
    <NuxtLink :to="`/products/${product.slug}`" class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass">
      <NuxtImg
        :src="product.image"
        :alt="`${product.name}, ${product.category.replace(/s$/, '')}`"
        width="400"
        height="400"
        sizes="sm:50vw md:33vw lg:25vw"
        loading="lazy"
        class="aspect-square w-full object-cover"
      />
      <div class="p-4">
        <h3 class="font-display text-lg">{{ product.name }}</h3>
        <p class="mt-1 text-sm text-ink/70">
          {{ formatKes(product.priceKes) }}
          <span v-if="!product.inStock" class="ml-2 text-garnet">Sold out</span>
        </p>
      </div>
    </NuxtLink>
  </article>
</template>
