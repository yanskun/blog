import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  target: "static",

  buildModules: ["nuxt-vite"],

  css: ["quasar/dist/quasar.prod.css"],

  modules: ["@nuxtjs/supabase"],
});
