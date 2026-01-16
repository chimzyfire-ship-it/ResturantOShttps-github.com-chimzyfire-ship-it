import { supabase } from '@/supabase'
import { useRestaurantStore } from '@/stores/restaurant'

export const iotService = {
  channel: null,

  async init() {
    const restaurantStore = useRestaurantStore()
    
    // Initialize the store (Fetch branches, etc)
    await restaurantStore.initializeCommandCenter()

    // Subscribe to the public 'sensor_logs' table events
    // In a real app, this would be Row Level Security protected, but for MVP we listen to public
    this.channel = supabase
      .channel('public:sensor_logs')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'sensor_logs' },
        (payload) => {

          // Payload format: { new: { branch_id: '...', sensor_type: '...', value: ... } }
          restaurantStore.updateSensorData(payload.new)
        }
      )
      .subscribe()
      

  },

  disconnect() {
    if (this.channel) {
      supabase.removeChannel(this.channel)
    }
  }
}
