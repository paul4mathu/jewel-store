<script setup lang="ts">
const route = useRoute()
useSeoMeta({ title: 'Order confirmed | Lumi', robots: 'noindex, nofollow' })
</script>

<template>
  <div>
    <h1 class="font-display text-3xl">Order placed</h1>
    <p class="mt-4">Thank you. Your order reference is <strong>{{ route.query.ref }}</strong>.</p>
    <p class="mt-2 text-sm text-ink/70">This is a demo store, so nothing will be shipped.</p>
    <NuxtLink to="/products" class="mt-6 inline-block underline">Keep shopping</NuxtLink>
  </div>
</template>
