<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
useSeoMeta({ title: `${props.error.statusCode === 404 ? 'Page not found' : 'Something went wrong'} | Lumi`, robots: 'noindex' })
</script>

<template>
  <NuxtLayout>
    <h1 class="font-display text-3xl">
      {{ error.statusCode === 404 ? 'We could not find that page' : 'Something went wrong' }}
    </h1>
    <p class="mt-4">Check the address, or head back to the shop.</p>
    <button type="button" class="mt-6 rounded-full bg-ink px-6 py-3 text-white hover:bg-garnet" @click="clearError({ redirect: '/products' })">
      Back to the shop
    </button>
  </NuxtLayout>
</template>
