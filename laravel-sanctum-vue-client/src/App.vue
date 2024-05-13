<script setup>
import Navigation from "./components/Navigation.vue";

defineProps({
  title: String
})
</script>

<template>
  <div>
    <Navigation />

    <main class="py-6 lg:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>