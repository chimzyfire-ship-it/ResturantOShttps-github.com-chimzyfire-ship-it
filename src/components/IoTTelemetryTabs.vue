<script setup>
import { ref, computed } from 'vue'
import { useRestaurantStore } from '@/stores/restaurant'
import { mdiChartBar, mdiSnowflake, mdiGasStation, mdiAlert } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import BaseButton from '@/components/BaseButton.vue'
import PillTag from '@/components/PillTag.vue'

const restaurantStore = useRestaurantStore()
const activeTab = ref('overview')

const dieselData = computed(() => {
    return restaurantStore.branches.map(b => {
        const m = restaurantStore.branchMetrics[b.id]
        return {
            name: b.name,
            level: m.dieselLevel,
            status: m.dieselLevel < 200 ? 'Critical' : 'Good',
            color: m.dieselLevel < 200 ? 'danger' : 'success'
        }
    })
})

const tempData = computed(() => {
    return restaurantStore.branches.map(b => {
        const m = restaurantStore.branchMetrics[b.id]
        return {
            name: b.name,
            temp: m.temperature,
            status: m.temperature > -15 ? 'Warning' : 'Good',
            color: m.temperature > -15 ? 'warning' : 'info'
        }
    })
})
</script>

<template>
  <div class="mb-6">
      <div class="flex gap-2 mb-4">
          <BaseButton 
            small 
            :color="activeTab === 'overview' ? 'info' : 'whiteDark'" 
            label="Overview" 
            :icon="mdiChartBar" 
            @click="activeTab = 'overview'" 
          />
           <BaseButton 
            small 
            :color="activeTab === 'diesel' ? 'info' : 'whiteDark'" 
            label="Diesel Levels" 
            :icon="mdiGasStation" 
            @click="activeTab = 'diesel'" 
          />
           <BaseButton 
            small 
            :color="activeTab === 'cold' ? 'info' : 'whiteDark'" 
            label="Cold Chain" 
            :icon="mdiSnowflake" 
            @click="activeTab = 'cold'" 
          />
      </div>

    <CardBox v-if="activeTab === 'overview'" class="mb-6" title="System Health Overview">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-gray-50 dark:bg-slate-800 rounded">
                <h3 class="font-bold text-gray-500 mb-2">Power Systems (Diesel)</h3>
                <div v-for="item in dieselData" :key="item.name" class="flex justify-between items-center mb-2 border-b pb-2 border-gray-200 dark:border-slate-700 last:border-0">
                    <span>{{ item.name }}</span>
                    <div class="flex items-center gap-2">
                        <span class="font-mono">{{ item.level }}L</span>
                        <PillTag :label="item.status" :color="item.color" small />
                    </div>
                </div>
            </div>
             <div class="p-4 bg-gray-50 dark:bg-slate-800 rounded">
                <h3 class="font-bold text-gray-500 mb-2">Cold Storage (Temp)</h3>
                 <div v-for="item in tempData" :key="item.name" class="flex justify-between items-center mb-2 border-b pb-2 border-gray-200 dark:border-slate-700 last:border-0">
                    <span>{{ item.name }}</span>
                    <div class="flex items-center gap-2">
                        <span class="font-mono">{{ item.temp }}°C</span>
                        <PillTag :label="item.status" :color="item.color" small />
                    </div>
                </div>
            </div>
        </div>
    </CardBox>

    <div v-if="activeTab === 'diesel'" class="grid grid-cols-1 md:grid-cols-3 gap-6">
         <CardBox v-for="item in dieselData" :key="item.name" class="mb-6">
            <div class="text-center">
                <h3 class="text-lg font-bold mb-2">{{ item.name }}</h3>
                <div class="text-4xl font-mono font-bold mb-2" :class="item.level < 200 ? 'text-red-500' : 'text-emerald-500'">
                    {{ item.level }} <span class="text-sm text-gray-400">Liters</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
                    <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: (item.level / 1000 * 100) + '%' }"></div>
                </div>
            </div>
         </CardBox>
    </div>

    <div v-if="activeTab === 'cold'" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardBox v-for="item in tempData" :key="item.name" class="mb-6">
            <div class="text-center">
                <h3 class="text-lg font-bold mb-2">{{ item.name }}</h3>
                <div class="text-4xl font-mono font-bold mb-2" :class="item.temp > -15 ? 'text-red-500' : 'text-blue-500'">
                    {{ item.temp }} <span class="text-sm text-gray-400">°C</span>
                </div>
                 <p v-if="item.temp > -15" class="text-red-500 text-sm mt-2 flex items-center justify-center gap-1">
                    <svg style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" :d="mdiAlert" /></svg>
                    Check Compressor
                 </p>
                 <p v-else class="text-emerald-500 text-sm mt-2">Optimal Range</p>
            </div>
         </CardBox>
    </div>
  </div>
</template>
