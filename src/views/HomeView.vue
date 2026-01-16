<script setup>
import { computed, ref, onMounted } from 'vue'
import IoTTelemetryTabs from '@/components/IoTTelemetryTabs.vue'
import { useMainStore } from '@/stores/main'
import { useRestaurantStore } from '@/stores/restaurant'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiCashMultiple,
  mdiSilverwareForkKnife,
  mdiAlertCircle,
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableRestaurantMonitor from '@/components/TableRestaurantMonitor.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

import CardBoxBranchPerformance from '@/components/CardBoxBranchPerformance.vue'

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  fillChartData()
})

const mainStore = useMainStore()
const restaurantStore = useRestaurantStore()
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Central Command" main />

      <div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CardBoxWidget
          trend="Today"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiCashMultiple"
          :number="restaurantStore.totalDailyRevenue"
          prefix="₦"
          label="Total Revenue"
          :trend-options="['Today', 'Yesterday', 'Last Week', 'This Month', 'Last Year']"
          @trend-selected="(opt) => restaurantStore.fetchHistoricalRevenue(opt)"
        />
        <CardBoxWidget
          trend="Lunch Rush"
          trend-type="up"
          color="text-blue-500"
          :icon="mdiSilverwareForkKnife"
          :number="restaurantStore.totalActiveOrders"
          label="Live Orders"
          :trend-options="['Lunch Rush', 'Breakfast', 'Dinner Service', 'All Day']"
          @trend-selected="(opt) => restaurantStore.fetchShiftOrders(opt)"
        />
        <CardBoxWidget
          trend="Action Req"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiAlertCircle"
          :number="restaurantStore.totalSystemStatus === 'Nominal' ? 0 : 3"
          :label="restaurantStore.totalSystemStatus"
          :trend-options="['Action Req', 'Logged Events', 'History']"
          suffix=""
        />
      </div>





      <div class="mb-6">
        <CardBoxBranchPerformance />
      </div>

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Asset Telemetry">
        <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData" />
      </SectionTitleLineWithButton>

      <IoTTelemetryTabs />

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Live Branch Monitor" />

      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Real-time Hospitality Intelligence.</b> Live feed from V.I., Ikeja, and Abuja branches.
      </NotificationBar>

      <CardBox has-table>
        <TableRestaurantMonitor />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
