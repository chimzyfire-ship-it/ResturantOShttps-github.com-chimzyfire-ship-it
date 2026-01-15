<script setup>
import { ref } from 'vue'
import { mdiRobot } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits(['toggle-assistant'])
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <BaseButton
      class="shadow-xl !p-4 rounded-full bg-slate-900 border border-slate-700 hover:scale-110 transition-transform duration-200"
      :icon="mdiRobot"
      color="contrast"
      icon-size="24"
      rounded-full
      @click="emit('toggle-assistant')"
    />
    <span class="absolute -top-2 -right-1 flex h-3 w-3">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
    </span>
  </div>
</template>
