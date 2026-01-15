<script setup>
import { reactive, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { 
  mdiAccount, 
  mdiCog, 
  mdiBell, 
  mdiLock, 
  mdiMonitor 
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import NotificationBar from '@/components/NotificationBar.vue'

const mainStore = useMainStore()

const activeTab = ref('general')

const tabs = [
  { id: 'general', label: 'General', icon: mdiCog },
  { id: 'notifications', label: 'Notifications', icon: mdiBell },
  { id: 'security', label: 'Security', icon: mdiLock },
  { id: 'display', label: 'Display & Appearance', icon: mdiMonitor },
]

const form = reactive({
  // General
  timezone: 'Africa/Lagos',
  language: 'en-NG',
  defaultBranch: 'VI-001',
  
  // Notifications
  telegramChatId: '',
  alertThresholds: ['critical', 'warning'],
  
  // Security
  apiKey: 'sk_live_51Mz...9X2q',
  encryption: 'AES-256',
  
  // Display
  density: 'comfortable',
  theme: 'system'
})

const submit = () => {
  // Save logic
  alert('Settings Saved Successfully')
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiCog" title="Command Configuration" main />

      <div class="mb-6 flex space-x-2 overflow-x-auto pb-2">
        <BaseButton
          v-for="tab in tabs"
          :key="tab.id"
          :label="tab.label"
          :icon="tab.icon"
          :color="activeTab === tab.id ? 'info' : 'white'"
          :outline="activeTab !== tab.id"
          @click="activeTab = tab.id"
        />
      </div>

      <CardBox is-form @submit.prevent="submit">
        <!-- GENERAL TAB -->
        <div v-if="activeTab === 'general'" class="space-y-4">
            <h3 class="text-lg font-bold mb-4">Regional Settings</h3>
            <FormField label="System Timezone">
                <FormControl v-model="form.timezone" :options="['Africa/Lagos', 'UTC', 'Europe/London']" />
            </FormField>
            <FormField label="Default Dashboard Branch">
                <FormControl v-model="form.defaultBranch" :options="['VI-001', 'IKE-002', 'All Branches']" />
            </FormField>
        </div>

        <!-- NOTIFICATIONS TAB -->
        <div v-if="activeTab === 'notifications'" class="space-y-4">
            <NotificationBar color="info" :icon="mdiBell">
                To receive alerts, start a chat with <b>@ChimzyHQ_Bot</b> and paste your ID below.
            </NotificationBar>
            
            <FormField label="Telegram Chat ID">
                <FormControl v-model="form.telegramChatId" placeholder="e.g. 123456789" />
            </FormField>

            <FormCheckRadioGroup
              class="mb-4"
              v-model="form.alertThresholds"
              name="alerts-check"
              :options="{ critical: 'Critical Failures (Red)', warning: 'Warnings (Yellow)', info: 'Daily Reports (Blue)' }"
              is-column
            />
        </div>

        <!-- SECURITY TAB -->
        <div v-if="activeTab === 'security'" class="space-y-4">
             <FormField label="IoT API Key" help="Used by physical devices to authenticate">
                <FormControl v-model="form.apiKey" icon="asterisk" readonly />
             </FormField>
             <BaseButton label="Rotate Key" color="danger" outline small />
             
             <BaseDivider />
             
             <FormField label="Encryption Protocol">
                <FormControl v-model="form.encryption" :options="['AES-256', 'TLS 1.3']" />
             </FormField>
        </div>

        <!-- DISPLAY TAB -->
        <div v-if="activeTab === 'display'" class="space-y-4">
            <FormField label="Data Density">
                 <FormCheckRadioGroup
                  v-model="form.density"
                  name="density-radio"
                  type="radio"
                  :options="{ compact: 'Compact (High Data)', comfortable: 'Comfortable' }"
                />
            </FormField>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <BaseButton type="submit" color="success" label="Save Changes" />
          </div>
        </template>
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>
