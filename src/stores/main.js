import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { supabase } from '@/supabase'

export const useMainStore = defineStore('main', () => {
  const userName = ref('Commander')
  const userEmail = ref('commander@chimzyfire.hq')
  const session = ref(null)

  const userAvatar = computed(() => {
    // If we have a real avatar URL, return it (not implemented yet for Supabase storage)
    // Otherwise return null so the component can render initials
    return null 
  })

  const isFieldFocusRegistered = ref(false)

  // ChimzyBistro Operations State
  const branches = ref([
    { id: 'VI-001', name: 'V.I. Flagship', type: 'Dine-In', city: 'Lagos', zone: 'Island', manager: 'Chinedu Okafor' },
    { id: 'IKE-002', name: 'Ikeja City Mall', type: 'QSR', city: 'Lagos', zone: 'Mainland', manager: 'Yusuf Ibrahim' },
    { id: 'SUR-003', name: 'Surulere', type: 'Express', city: 'Lagos', zone: 'Mainland', manager: 'Funke Adeleke' },
    { id: 'WUS-004', name: 'Abuja Wuse II', type: 'Dine-In', city: 'Abuja', zone: 'FCT', manager: 'Aisha Bello' },
    { id: 'GRA-005', name: 'PH GRA Phase 2', type: 'Dine-In', city: 'Port Harcourt', zone: 'Rivers', manager: 'Emeka Nnamdi' },
  ])

  const assets = ref([]) // Using this for "Branch Monitor" rows
  const systemMetrics = ref({
    totalRevenue: 4500000, // NGN
    activeOrders: 142,
    criticalAlerts: 3, // e.g., Freezer down
    coldChainHealth: 92 // % of sensors < -18C
  })

  // Auth
  async function loginWithPassword(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    if (data.session) {
      session.value = data.session
      userName.value = 'Operations Mgr'
      userEmail.value = data.user.email
    }
  }

  async function checkSession() {
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      session.value = data.session
      userName.value = 'Operations Mgr'
      userEmail.value = data.session.user.email
    }
  }

  async function abortSession() {
    await supabase.auth.signOut()
    session.value = null
    userName.value = 'Operations Mgr'
    userEmail.value = 'ops@chimzybistro.com'
  }

  function setUser(payload) {
    if (payload.name) {
      userName.value = payload.name
    }
    if (payload.email) {
      userEmail.value = payload.email
    }
  }

  async function fetchDashboardData() {
    generateRestaurantData()
  }

  function generateRestaurantData() {
    const newMonitorData = []
    
    // Generate Live Monitor Data for each branch
    branches.value.forEach(branch => {
      // Simulate Live Sales (Cash vs Transfer struggle)
      const dailySales = Math.floor(Math.random() * 800000) + 200000
      const transferIssue = Math.random() > 0.8
      
      // Kitchen Pulse
      const kitchenLoad = Math.random()
      let kitchenStatus = 'Moderate'
      let kitchenColor = 'info'
      if (kitchenLoad > 0.8) { kitchenStatus = 'Slammed'; kitchenColor = 'danger' }
      else if (kitchenLoad < 0.3) { kitchenStatus = 'Slow'; kitchenColor = 'success' }

      // Critical Infrastructure (The "Real Problems")
      const freezerTemp = Math.floor(Math.random() * 5) - 22 // Target -18
      const freezerOk = freezerTemp < -15
      const dieselLevel = Math.floor(Math.random() * 1000)
      
      let criticalAlert = 'Nominal'
      let alertColor = 'success'
      
      if (!freezerOk) { 
        criticalAlert = `Freezer Fail (${freezerTemp}C)`
        alertColor = 'danger'
      } else if (dieselLevel < 200) {
        criticalAlert = 'Low Diesel'
        alertColor = 'warning'
      } else if (transferIssue) {
        criticalAlert = 'POS Network Down'
        alertColor = 'warning'
      }

      newMonitorData.push({
        id: branch.id,
        branch: branch.name,
        manager: branch.manager,
        sales: `₦${(dailySales).toLocaleString()}`,
        kitchenStatus: kitchenStatus,
        kitchenColor: kitchenColor,
        alert: criticalAlert,
        alertColor: alertColor,
        metric: freezerOk ? 'Cold Chain OK' : 'SPOILAGE RISK'
      })
    })

    assets.value = newMonitorData
    
    // Aggregate System Metrics
    systemMetrics.value.totalRevenue = newMonitorData.reduce((acc, curr) => acc + parseInt(curr.sales.replace(/\D/g, '')), 0)
    systemMetrics.value.criticalAlerts = newMonitorData.filter(i => i.alertColor === 'danger').length
  }

  return {
    userName,
    userEmail,
    userAvatar,
    isFieldFocusRegistered,
    assets,
    branches,
    systemMetrics,
    session,
    loginWithPassword,
    checkSession,
    abortSession,
    setUser,
    fetchDashboardData,
  }
})
