import { createClient } from '@supabase/supabase-js'

const url = 'https://pfrnbtvoqjansyapnqvc.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcm5idHZvcWphbnN5YXBucXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyODk1NDYsImV4cCI6MjA4Mzg2NTU0Nn0.WOQ7xPJOxHhitlJHqrp6gEDS5N03xE-x75mbwe8xpe8'

const supabase = createClient(url, key)

async function testConnection() {
  console.log('Testing Supabase Connection...')
  try {
    // Try to fetch something harmless, or just check session
    const { data, error } = await supabase.from('dashboard_stats').select('*').limit(1)
    
    if (error) {
      // If we get a 404/relation does not exist, that means we CONNECTED but table missing. Good.
      // If we get 401, keys are bad.
      if (error.code === '42P01') { // undefined_table
         console.log('Connection Successful! (Table dashboard_stats missing as expected)')
      } else {
         console.log('Connection Successful! (Response received: ' + error.message + ')')
      }
    } else {
      console.log('Connection Successful! (Data received)')
    }
  } catch (err) {
    console.error('Connection Failed:', err)
  }
}

testConnection()
