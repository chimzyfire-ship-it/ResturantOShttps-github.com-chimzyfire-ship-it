<script setup>
import { ref } from 'vue'
import { mdiAccountPlus, mdiWhatsapp, mdiClose } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const form = ref({
    name: '',
    phone: '',
    branch: 'VI-001'
})

const branchOptions = [
    { id: 'VI-001', label: 'V.I. Flagship' },
    { id: 'IKE-002', label: 'Ikeja City Mall' },
    { id: 'SUR-003', label: 'Surulere' },
    { id: 'WUS-004', label: 'Abuja Wuse II' },
    { id: 'GRA-005', label: 'PH GRA Phase 2' }
]

const submit = () => {
    // In a real app, this would send an INVITE via SMS/WhatsApp
    console.log("Registering Manager:", form.value)
    emit('confirm', form.value)
    emit('update:modelValue', false)
    // Reset
    form.value = { name: '', phone: '', branch: 'VI-001' } 
}
</script>

<template>
  <CardBoxModal 
    :model-value="modelValue" 
    :title="'Register New Manager'" 
    button="info"
    has-cancel
    @update:model-value="emit('update:modelValue', $event)"
    @confirm="submit"
  >
    <p class="mb-4 text-gray-500 dark:text-gray-400">
        Enter the manager's details. They will receive an access code via WhatsApp.
    </p>

    <FormField label="Full Name">
        <FormControl v-model="form.name" :icon="mdiAccountPlus" placeholder="e.g. Chinedu Okafor" />
    </FormField>

    <FormField label="WhatsApp Number">
        <FormControl v-model="form.phone" :icon="mdiWhatsapp" type="tel" placeholder="e.g. +234 80..." />
    </FormField>

    <FormField label="Assign Branch">
        <FormControl v-model="form.branch" :options="branchOptions" />
    </FormField>
  </CardBoxModal>
</template>
