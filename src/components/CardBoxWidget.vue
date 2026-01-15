<script setup>
import { mdiCog } from '@mdi/js'
import { ref } from 'vue'
import CardBox from '@/components/CardBox.vue'
import NumberDynamic from '@/components/NumberDynamic.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import PillTagTrend from '@/components/PillTagTrend.vue'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({
  number: {
    type: Number,
    default: null,
  },
  icon: String,
  prefix: String,
  suffix: String,
  label: String,
  color: String,
  trend: String,
  trendType: String,
  trendOptions: {
    type: Array,
    default: () => []
  }
})

const isDropdownActive = ref(false)
const isTrendDropdownActive = ref(false)
const currentTrend = ref(null)

const toggleTrendDropdown = () => {
    if (props.trendOptions && props.trendOptions.length > 0) {
        isTrendDropdownActive.value = !isTrendDropdownActive.value
    }
}

const emit = defineEmits(['trend-selected'])

const selectTrend = (option) => {
    currentTrend.value = option
    isTrendDropdownActive.value = false
    emit('trend-selected', option)
}
</script>

<template>
  <CardBox>
    <BaseLevel v-if="trend" class="mb-3" mobile>
      <div class="relative">
        <div @click="toggleTrendDropdown" class="cursor-pointer hover:opacity-80 transition-opacity">
            <PillTagTrend :trend="currentTrend || trend" :trend-type="trendType" small />
        </div>
        
        <div 
            v-if="isTrendDropdownActive" 
            class="absolute left-0 top-full mt-2 z-50 min-w-[150px] bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded shadow-xl py-1"
        >
            <div 
                v-for="option in trendOptions" 
                :key="option"
                class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                @click="selectTrend(option)"
            >
                {{ option }}
            </div>
        </div>
        <div v-if="isTrendDropdownActive" class="fixed inset-0 z-40 bg-transparent" @click="isTrendDropdownActive = false"></div>
      </div>
      
      <div class="relative">
          <BaseButton 
            :icon="mdiCog" 
            icon-w="w-4" 
            icon-h="h-4" 
            color="lightDark" 
            small 
            @click="isDropdownActive = !isDropdownActive"
          />
          <div 
            v-if="isDropdownActive" 
            class="absolute right-0 top-8 z-50 min-w-[140px] bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded shadow-lg py-1 animate-fade-in"
          >
              <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700">View Analysis</a>
              <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700">Export CSV</a>
              <hr class="border-gray-100 dark:border-slate-700 my-1" />
              <a href="#" class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-slate-700">Dismiss</a>
          </div>
          <!-- Click Outside Overlay -->
          <div v-if="isDropdownActive" class="fixed inset-0 z-40 bg-transparent" @click="isDropdownActive = false"></div>
      </div>
    </BaseLevel>
    <BaseLevel mobile>
      <div>
        <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
          {{ label }}
        </h3>
        <h1 class="text-3xl leading-tight font-semibold">
          <NumberDynamic v-if="number !== null" :value="number" :prefix="prefix" :suffix="suffix" />
          <span v-else class="text-gray-400 text-2xl">No Data</span>
        </h1>
      </div>
      <BaseIcon v-if="icon" :path="icon" size="48" w="" h="h-16" :class="color" />
    </BaseLevel>
  </CardBox>
</template>
