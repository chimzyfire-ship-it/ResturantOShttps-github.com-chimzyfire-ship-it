<script setup>
import { computed } from 'vue'

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  avatar: String,
})

const initials = computed(() => {
  const name = props.username || 'Commander'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
})
</script>

<template>
  <div class="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-slate-600 w-full h-full">
    <img
      v-if="avatar"
      :src="avatar"
      :alt="username"
      class="h-full w-full object-cover"
    />
    <span v-else class="font-medium text-gray-600 dark:text-gray-300 text-lg lg:text-sm">
      {{ initials }}
    </span>
    <slot />
  </div>
</template>
