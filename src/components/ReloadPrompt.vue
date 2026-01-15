<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { ref, watch } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}

const update = async () => {
    await updateServiceWorker()
}
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="fixed bottom-0 right-0 m-6 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-2xl z-50 border border-gray-100 dark:border-slate-700 max-w-sm"
    role="alert"
  >
    <div class="mb-4">
      <h3 v-if="offlineReady" class="font-bold text-lg">App ready to work offline</h3>
      <h3 v-else class="font-bold text-lg">New Content Available</h3>
      <p class="text-gray-500 text-sm mt-1">
         <span v-if="offlineReady">You can now use this app without internet.</span>
         <span v-else>A new version of Command Center OS is available. Update now to see changes.</span>
      </p>
    </div>
    
    <div class="flex gap-2 justify-end">
        <BaseButton v-if="needRefresh" label="Update Now" color="info" small @click="update" />
        <BaseButton label="Dismiss" color="whiteDark" small @click="close" />
    </div>
  </div>
</template>
