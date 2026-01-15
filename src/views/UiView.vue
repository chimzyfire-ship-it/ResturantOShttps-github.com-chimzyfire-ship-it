<script setup>
import { computed } from 'vue'
import { 
  mdiSnowflake, 
  mdiPackageVariant, 
  mdiAlertCircle, 
  mdiCheckCircle,
  mdiThermometer
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import { useRestaurantStore } from '@/stores/restaurant'

const restaurantStore = useRestaurantStore()

// Defaulting to V.I. Flagship for this view
const branchId = 'VI-001'
const metrics = computed(() => restaurantStore.branchMetrics[branchId] || {})
const stock = computed(() => metrics.value.stock || { chicken: 0, beef: 0, rice: 0 })

const tempStatus = computed(() => {
    const t = metrics.value.temperature
    if (t > -10) return { color: 'text-red-500', icon: mdiAlertCircle, text: 'CRITICAL FAIL' }
    if (t > -15) return { color: 'text-yellow-500', icon: mdiAlertCircle, text: 'WARNING' }
    return { color: 'text-emerald-500', icon: mdiCheckCircle, text: 'OPTIMAL' }
})

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiPackageVariant" title="Inventory & Cold Chain Control" main />

      <!-- Cold Chain Monitoring (IoT) -->
      <div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CardBox class="mb-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <h3 class="text-lg font-bold mb-2 flex items-center">
                <BaseIcon :path="mdiSnowflake" class="mr-2" /> Cold Room A
            </h3>
            <div class="flex justify-between items-end">
                <div>
                    <span class="text-5xl font-mono font-bold">{{ metrics.temperature }}°C</span>
                    <div class="text-sm opacity-80 mt-1">Target: -18°C</div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-xl">{{ tempStatus.text }}</div>
                    <div class="text-xs opacity-75">Sensor: IoT-9982</div>
                </div>
            </div>
        </CardBox>

        <CardBoxWidget
          trend="82%"
          trend-type="up"
          color="text-amber-500"
          :icon="mdiThermometer"
          :number="metrics.dieselLevel"
          suffix="L"
          label="Generator Diesel Level"
          :trend-options="['Current', 'Yesterday', 'Last Week', 'Refill Log']"
          @trend-selected="(opt) => restaurantStore.fetchDieselHistory(opt)"
        />
      </div>

      <!-- Live Stock Levels -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
         <CardBox class="text-center">
            <div class="text-gray-500 mb-2">Frozen Chicken</div>
            <div class="text-3xl font-bold mb-1">{{ stock.chicken }} kg</div>
            <div class="text-xs text-green-500">Stock Healthy</div>
         </CardBox>

         <CardBox class="text-center">
            <div class="text-gray-500 mb-2">Beef Cuts</div>
            <div class="text-3xl font-bold mb-1">{{ stock.beef }} kg</div>
            <div class="text-xs text-yellow-500">Low Stock</div>
         </CardBox>

         <CardBox class="text-center">
            <div class="text-gray-500 mb-2">Rice (Jollof)</div>
            <div class="text-3xl font-bold mb-1">{{ stock.rice }} Pots</div>
            <div class="text-xs text-green-500">Prepared</div>
         </CardBox>
      </div>

    </SectionMain>
  </LayoutAuthenticated>
</template>
