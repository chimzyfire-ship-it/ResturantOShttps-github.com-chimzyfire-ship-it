<script setup>
import { reactive, ref } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiAlertCircle, mdiCashMultiple } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import NotificationBar from '@/components/NotificationBar.vue'

import { useRestaurantStore } from '@/stores/restaurant'

const restaurantStore = useRestaurantStore()

const form = reactive({
  chicken: '',
  beef: '',
  jollof: '',
  semo: '',
  waste: '',
  cashCount: '',
  discrepancy: 'match',
  notes: ''
})

const submit = () => {
  // Simulate submission for V.I. Flagship
  restaurantStore.submitClosingReport('VI-001', form)
  alert('Closing Report Submitted to Head Office.')
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Branch Terminal: Closing Report" main>
        <BaseButton
          label="Shift: PM (Closing)"
          color="contrast"
          rounded-full
          small
          disabled
        />
      </SectionTitleLineWithButton>
      
      <NotificationBar color="warning" :icon="mdiAlertCircle">
        <b>Requirement.</b> All Branch Managers must submit Closing Stock & Cash Count by 11:00 PM.
      </NotificationBar>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Inventory Section -->
        <CardBox title="Inventory Audit" :icon="mdiBallotOutline" is-form @submit.prevent="submit">
          <FormField label="Protein Stock (Closing Count)">
            <FormControl v-model="form.chicken" :icon="mdiAccount" placeholder="Frozen Chicken (kg)" />
            <FormControl v-model="form.beef" :icon="mdiAccount" placeholder="Beef (kg)" />
          </FormField>

          <FormField label="Grains & Carb (Bags/Pots)">
             <div class="grid grid-cols-2 gap-4">
                <FormControl v-model="form.jollof" placeholder="Jollof Rice (Pots)" />
                <FormControl v-model="form.semo" placeholder="Semo (Bags)" />
             </div>
          </FormField>

          <BaseDivider />

          <FormField label="Waste Log" help="Record any spoilt/dropped items">
            <FormControl v-model="form.waste" type="textarea" placeholder="Item Name - Qty - Reason" />
          </FormField>
          
          <template #footer>
             <!-- Empty footer to match layout -->
          </template>
        </CardBox>

        <!-- Finance Section -->
        <CardBox title="Cash Reconciliation" :icon="mdiCashMultiple" is-form @submit.prevent="submit">
           <div class="mb-4 bg-gray-50 dark:bg-slate-800 p-4 rounded">
              <div class="flex justify-between mb-2">
                 <span class="text-gray-500">System Recorded Cash:</span>
                 <span class="font-bold font-mono">₦1,240,500</span>
              </div>
              <div class="flex justify-between">
                 <span class="text-gray-500">POS Settlements:</span>
                 <span class="font-bold font-mono">₦3,100,000</span>
              </div>
           </div>

           <FormField label="Physical Cash Count" help="Enter total cash in safe">
              <FormControl v-model="form.cashCount" :icon="mdiCashMultiple" placeholder="e.g. 1240500" />
           </FormField>
           
           <FormCheckRadioGroup
              class="mb-4"
              v-model="form.discrepancy"
              name="cash-discrepancy"
              :options="{ match: 'Cash Matches System', short: 'Shortage (Explain)', over: 'Overage (Explain)' }"
              is-column
            />

            <FormField label="Manager Explanation">
               <FormControl v-model="form.notes" type="textarea" placeholder="Explain any variances..." />
            </FormField>

           <template #footer>
            <BaseButton type="submit" color="success" label="Submit Closing Report" />
            <BaseButton type="reset" color="danger" outline label="Reset" />
          </template>
        </CardBox>
      </div>

    </SectionMain>
  </LayoutAuthenticated>
</template>
