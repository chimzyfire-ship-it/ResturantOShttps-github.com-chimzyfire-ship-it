<script setup>
import { computed, ref } from 'vue'
import { useRestaurantStore } from '@/stores/restaurant'
import { mdiEye, mdiMessageText } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import PillTag from '@/components/PillTag.vue'

defineProps({
  checkable: Boolean,
})

const restaurantStore = useRestaurantStore()

const items = computed(() => restaurantStore.monitorData)

const isModalActive = ref(false)
const isModalDangerActive = ref(false)
const isContactModalActive = ref(false)
const selectedManager = ref('')

const perPage = ref(10)
const currentPage = ref(0)
const checkedRows = ref([])

const itemsPaginated = computed(() =>
  items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1)),
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))
const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }
  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []
  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })
  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
  }
}

const contactManager = (manager) => {
  selectedManager.value = manager
  isContactModalActive.value = true
}
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Asset Diagnostics">
    <p>Running diagnostics on selected asset...</p>
    <p><b>Systems Nominal.</b></p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Decommission Asset" button="danger" has-cancel>
    <p>Are you sure you want to decommission this asset?</p>
    <p>This action requires Level 4 Clearance.</p>
  </CardBoxModal>

  <CardBoxModal v-model="isContactModalActive" title="Secure Comms" button="info" has-cancel>
    <p>Establishing secure line to <b>{{ selectedManager }}</b>...</p>
    <p class="text-xs text-gray-500 mt-2">Encryption: AES-256-GCM. Channel: OMEGA.</p>
  </CardBoxModal>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>Branch Location</th>
        <th>Live Revenue (Today)</th>
        <th>Kitchen Pulse</th>
        <th>Diesel</th>
        <th>Temp</th>
        <th>Actions</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" />
        <td data-label="Branch Location">
          <div class="font-bold">{{ client.branch }}</div>
          <div class="text-xs text-gray-500 mt-0.5">{{ client.manager }}</div>
        </td>
        <td data-label="Live Revenue">
          <span class="font-mono font-semibold">{{ client.sales }}</span>
          <small class="block text-gray-400 text-xs">Cash/Transfer/POS</small>
        </td>
        <td data-label="Kitchen Pulse">
          <PillTag :color="client.kitchenColor" :label="client.kitchenStatus" small />
        </td>
        <td data-label="Diesel Level">
           <PillTag :color="client.diesel < 200 ? 'danger' : 'success'" :label="client.diesel + 'L'" small />
        </td>
        <td data-label="Termperature">
           <PillTag :color="client.temp > -15 ? 'danger' : 'info'" :label="client.temp + '°C'" small />
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
             <BaseButton color="info" :icon="mdiMessageText" small @click="contactManager(client.manager)" label="Call Mgr" />
          </BaseButtons>
        </td>
        <td class="whitespace-nowrap before:hidden lg:w-1">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="contrast" :icon="mdiEye" small @click="isModalActive = true" />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="border-t border-gray-100 p-3 lg:px-6 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
