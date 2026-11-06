const siteUrl =
  process.env.NUXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt', '@nuxtjs/sitemap'],
  site: { url: siteUrl, name: 'Lumi Jewellery' },
  runtimeConfig: { public: { siteUrl } },
  // Product URLs are read from the database by this endpoint
  sitemap: { sources: ['/api/__sitemap__/urls'] },
  image: { format: ['webp'], quality: 80 },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'theme-color', content: '#1B1F2A' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
