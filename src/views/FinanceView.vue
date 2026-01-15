<script setup>
import { ref } from 'vue'
import { useRestaurantStore } from '@/stores/restaurant'
import {
  mdiCashMultiple,
  mdiCreditCardOutline,
  mdiBankTransfer,
  mdiChartBox,
  mdiDatabaseCheck
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import PillTag from '@/components/PillTag.vue'

const restaurantStore = useRestaurantStore()

const activeTab = ref('revenue')

const tabs = [
  { id: 'revenue', label: 'Revenue Analysis', icon: mdiChartBox },
  { id: 'recon', label: 'Reconciliation', icon: mdiDatabaseCheck }
]
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCashMultiple" title="Financial Operations" main>
        <div class="flex gap-2">
            <BaseButton
                v-for="tab in tabs"
                :key="tab.id"
                :label="tab.label"
                :icon="tab.icon"
                :color="activeTab === tab.id ? 'info' : 'whiteDark'"
                @click="activeTab = tab.id"
                small
            />
        </div>
      </SectionTitleLineWithButton>

      <div v-if="activeTab === 'revenue'">
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
            <CardBoxWidget
              trend="Today"
              trend-type="up"
              color="text-emerald-500"
              :icon="mdiCashMultiple"
              :number="restaurantStore.totalDailyRevenue"
              prefix="₦"
              label="Total Revenue"
            />
             <CardBoxWidget
              trend="System Wide"
              trend-type="up"
              color="text-blue-500"
              :icon="mdiCreditCardOutline"
              :number="restaurantStore.totalActiveOrders * 2000" 
              prefix="₦"
              label="Projected Revenue"
            />
             <CardBoxWidget
              trend="Pending"
              trend-type="alert"
              color="text-yellow-500"
              :icon="mdiBankTransfer"
              :number="50000"
              prefix="₦"
              label="Unverified Transfers"
            />
          </div>

          <CardBox title="Revenue Stream by Branch">
              <table class="w-full">
                  <thead>
                      <tr class="text-left text-gray-500">
                          <th>Branch</th>
                          <th>Daily Total</th>
                          <th>Cash</th>
                          <th>POS</th>
                          <th>Transfers</th>
                      </tr>
                  </thead>
                   <tbody>
                      <tr v-for="branch in restaurantStore.reconData" :key="branch.id" class="border-t border-gray-100 dark:border-slate-800">
                          <td class="py-3 font-semibold">{{ branch.name }}</td>
                          <td class="font-bold text-emerald-600">{{ branch.total }}</td>
                          <td>{{ branch.cash }}</td>
                          <td>{{ branch.pos }}</td>
                          <td>{{ branch.transfer }}</td>
                      </tr>
                  </tbody>
              </table>
          </CardBox>
      </div>

      <div v-if="activeTab === 'recon'">
           <CardBox title="End-of-Day Reconciliation" has-table>
              <table>
                   <thead>
                      <tr>
                          <th>Branch</th>
                          <th>System Total</th>
                          <th>Verified Total</th>
                          <th>Variance</th>
                          <th>Status</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="branch in restaurantStore.reconData" :key="branch.id">
                          <td data-label="Branch">{{ branch.name }}</td>
                          <td data-label="System Total">{{ branch.total }}</td>
                          <td data-label="Verified">{{ branch.total }}</td>
                          <td data-label="Variance" :class="branch.varianceColor" class="font-bold">
                              {{ branch.variance }}
                          </td>
                           <td data-label="Status">
                               <PillTag :label="branch.status" :color="branch.status === 'Balanced' ? 'success' : 'warning'" small />
                           </td>
                           <td>
                               <BaseButton color="info" label="Review" small />
                           </td>
                      </tr>
                  </tbody>
              </table>
           </CardBox>
      </div>

    </SectionMain>
  </LayoutAuthenticated>
</template>
