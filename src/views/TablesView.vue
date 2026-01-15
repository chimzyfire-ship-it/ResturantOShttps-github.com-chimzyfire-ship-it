<script setup>
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiGithub, mdiAccountPlus } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableRestaurantMonitor from '@/components/TableRestaurantMonitor.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import AddManagerModal from '@/components/AddManagerModal.vue'
import { ref } from 'vue'

const isModalActive = ref(false)
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Branch Monitor" main>
        <BaseButton
          label="Add Manager"
          color="info"
          :icon="mdiAccountPlus"
          rounded-full
          small
          @click="isModalActive = true"
        />
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Real-Time Branch Performance.</b> Monitoring Sales, Kitchen Load, and Infrastructure.
      </NotificationBar>

      <CardBox class="mb-6" has-table>
        <TableRestaurantMonitor checkable />
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" />

      <NotificationBar color="danger" :icon="mdiTableOff">
        <b>No Operatives Found.</b> Database returned zero results.
      </NotificationBar>

      <CardBox>
        <CardBoxComponentEmpty />
      </CardBox>

      <AddManagerModal v-model="isModalActive" @confirm="params => {}" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
