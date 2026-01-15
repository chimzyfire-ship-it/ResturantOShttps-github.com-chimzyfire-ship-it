<script setup>
import CardBox from '@/components/CardBox.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { mdiOfficeBuildingMarker } from '@mdi/js'

defineProps({
  className: String,
})
</script>

<template>
  <CardBox :class="className" class="flex-col">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <BaseIcon :path="mdiOfficeBuildingMarker" size="24" class="text-gray-500" />
        <h3 class="text-lg font-bold text-gray-700 dark:text-gray-200">Branch Performance</h3>
      </div>
      <span class="text-xs font-semibold text-gray-500">REAL-TIME</span>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <!-- Lagos Branch -->
      <div class="rounded-lg bg-gray-50 p-4 dark:bg-slate-800">
        <div class="mb-1 text-sm text-gray-500">Lagos HQ</div>
        <div class="text-2xl font-bold text-emerald-500">98%</div>
        <div class="text-xs text-gray-400">Operational Capacity</div>
        <div class="mt-2 h-1 w-full rounded-full bg-gray-200 dark:bg-slate-700">
          <div class="h-1 rounded-full bg-emerald-500" style="width: 98%"></div>
        </div>
      </div>

      <!-- Abuja Branch -->
      <div class="rounded-lg bg-gray-50 p-4 dark:bg-slate-800">
        <div class="mb-1 text-sm text-gray-500">Abuja Outpost</div>
        <div class="text-2xl font-bold text-orange-500">82%</div>
        <div class="text-xs text-gray-400">Operational Capacity</div>
        <div class="mt-2 h-1 w-full rounded-full bg-gray-200 dark:bg-slate-700">
          <div class="h-1 rounded-full bg-orange-500" style="width: 82%"></div>
        </div>
      </div>
    </div>
  </CardBox>
</template>
