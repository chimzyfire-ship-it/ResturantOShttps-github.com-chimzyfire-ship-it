import { supabase } from '@/supabase'

// This service mimics the PHYSICAL HARDWARE + EDGE FUNCTION
// It runs in the browser for the demo, but logic represents the device's firmware loop

const branches = [
  'VI-001', 'IKE-002', 'SUR-003', 'WUS-004', 'GRA-005'
]

let intervalId = null

export const iotSimulation = {
  start() {
    if (intervalId) return
    console.log('Mock Hardware: Started. Simulating sensors...')
    
    intervalId = setInterval(async () => {
      // Pick a random branch
      const branchId = branches[Math.floor(Math.random() * branches.length)]
      
      // Simulate Metric: 
      // 40% Diesel, 20% Temp, 40% Sale
      const rand = Math.random()
      let type = 'diesel'
      let value = 0

      if (rand < 0.4) {
          type = 'diesel'
          value = Math.floor(Math.random() * 800) + 100
      } else if (rand < 0.6) {
          type = 'temperature'
          value = Math.floor(Math.random() * 5) - 22
      } else {
          type = 'sales'
          value = Math.floor(Math.random() * 5000) + 1000 // Realtime sale transaction
      }
      
      const payload = {
        branch_id: branchId,
        sensor_type: type,
        value: value,
        timestamp: new Date().toISOString()
      }

      try {
        // In the real world, the hardware POSTs to an API.
        // Here, we write directly to Supabase to trigger the Realtime event the UI is listening for.
        const { error } = await supabase
          .from('sensor_logs')
          .insert([payload])

        if (error) {
           // If table doesn't exist or RLS fails (likely in this demo env), 
           // we fallback to Dispatching locally to "Fake" the realtime if Supabase isn't fully configured
           console.warn('Mock Hardare: Write failed (expected if DB not setup). Falling back to local dispatch simulation.', error)
           this.fallbackDispatch(payload)
        } else {
           console.log(`Mock Hardware: Sent ${payload.sensor_type} -> ${payload.value} for ${branchId}`)
        }
      } catch (err) {
        console.warn('Mock Hardware: Error', err)
      }

    }, 5000) // Every 5 seconds
  },

  stop() {
    if (intervalId) clearInterval(intervalId)
    intervalId = null
    console.log('Mock Hardware: Stopped.')
  },
  
  // If Supabase table isn't created, we cheat and call the store directly 
  // just so the user sees the UI update in this "No Backend" environment if needed.
  // BUT the architecture remains "Listener Pattern".
  fallbackDispatch(payload) {
    // We need to dynamic import to avoid circular dep issues in some bundlers if we aren't careful, 
    // but here it's fine.
    import('@/stores/restaurant').then(({ useRestaurantStore }) => {
        const store = useRestaurantStore()
        store.updateSensorData(payload)
    })
  }
}
