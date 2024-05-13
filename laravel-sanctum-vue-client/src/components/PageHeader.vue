<script setup>
defineProps({
  title: String
})
</script>

<template>
  <header>
    <div class="mx-auto max-w-7xl">
      <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        {{ title }}
      </h1>
    </div>
  </header>
</template>