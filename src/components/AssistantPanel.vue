<script setup>
import { ref, nextTick, watch } from 'vue'
import { mdiSend, mdiRobot, mdiClose, mdiAccount } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import { useRestaurantStore } from '@/stores/restaurant'

const props = defineProps({
  active: Boolean
})

const emit = defineEmits(['close'])

const restaurantStore = useRestaurantStore()
const input = ref('')
const messages = ref([
  { id: 1, role: 'system', text: 'Commander AI online. Systems nominal. How can I assist you today?' }
])
const chatContainer = ref(null)

const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
}

watch(() => props.active, (val) => {
    if (val) scrollToBottom()
})

const processQuery = (query) => {
    const lowerQ = query.toLowerCase()
    let response = "I'm processing that request... access denied or data unavailable."

    // Simple Intent Matching for Demo
    if (lowerQ.includes('revenue') || lowerQ.includes('sales')) {
        const rev = restaurantStore.totalDailyRevenue.toLocaleString()
        response = `Total System Revenue is currently ₦${rev}. Trends indicate a 12% increase from yesterday.`
    } else if (lowerQ.includes('diesel') || lowerQ.includes('fuel')) {
        const lowBranches = restaurantStore.branches.filter(b => 
            restaurantStore.branchMetrics[b.id]?.dieselLevel < 300
        ).map(b => b.name)
        
        if (lowBranches.length > 0) {
            response = `Critical Alert: Low fuel levels detected at: ${lowBranches.join(', ')}. Pending resupply orders recommended.`
        } else {
            response = "All power systems are operating within optimal fuel parameters (>300L)."
        }
    } else if (lowerQ.includes('temp') || lowerQ.includes('cold')) {
        response = "Scanning cold chain telemetry... All sensors active. Lekki Branch reporting fluctuating variance of 0.5°C, potentially due to restocking."
    } else if (lowerQ.includes('report') || lowerQ.includes('summary')) {
        response = "Generating Executive Summary... \n\n- Revenue: Strong \n- Ops: Stable \n- Alerts: None critical. \n\nWould you like me to export this to PDF?"
    } else if (lowerQ.includes('hello') || lowerQ.includes('hi')) {
       response = "Greetings, Commander. Ready for instructions."
    }

    return response
}

const sendMessage = async () => {
    if (!input.value.trim()) return

    // User Message
    messages.value.push({ id: Date.now(), role: 'user', text: input.value })
    const userQuery = input.value
    input.value = ''
    await scrollToBottom()

    // Simulate Network Delay / Thinking
    setTimeout(async () => {
        const answer = processQuery(userQuery)
        messages.value.push({ id: Date.now() + 1, role: 'system', text: answer })
        await scrollToBottom()
    }, 600)
}
</script>

<template>
  <div v-if="active" class="fixed bottom-24 right-6 z-50 w-96 max-w-[90vw] animate-fade-in-up">
    <CardBox class="shadow-2xl border border-gray-700 !bg-slate-900 !text-white" :header-icon="mdiRobot" title="Commander AI">
       <template #header-right>
           <BaseButton :icon="mdiClose" small color="whiteDark" @click="emit('close')" />
       </template>
       
       <div ref="chatContainer" class="h-80 overflow-y-auto p-2 space-y-4 mb-4 scrollbar-hide">
           <div v-for="msg in messages" :key="msg.id" class="flex gap-2" :class="msg.role === 'user' ? 'flex-row-reverse' : ''">
               <div class="h-8 w-8 min-w-[2rem] rounded-full flex items-center justify-center bg-gray-700 border border-gray-600">
                    <svg style="width:16px;height:16px" viewBox="0 0 24 24" class="text-gray-300">
                        <path fill="currentColor" :d="msg.role === 'user' ? mdiAccount : mdiRobot" />
                    </svg>
               </div>
               <div class="p-3 rounded-lg text-sm max-w-[80%]" 
                    :class="msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-gray-200 border border-gray-700 rounded-tl-none'">
                   {{ msg.text }}
               </div>
           </div>
       </div>

       <div class="flex gap-2 border-t border-gray-700 pt-3">
           <input 
             v-model="input"
             @keyup.enter="sendMessage"
             class="flex-1 bg-slate-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
             placeholder="Command processing... type query"
           />
           <BaseButton :icon="mdiSend" color="info" @click="sendMessage" />
       </div>
    </CardBox>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
}
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
