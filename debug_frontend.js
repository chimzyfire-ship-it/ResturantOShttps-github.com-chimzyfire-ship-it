import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfrnbtvoqjansyapnqvc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcm5idHZvcWphbnN5YXBucXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyODk1NDYsImV4cCI6MjA4Mzg2NTU0Nn0.WOQ7xPJOxHhitlJHqrp6gEDS5N03xE-x75mbwe8xpe8'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function debugFrontendFetch() {
  console.log('Testing Frontend Fetch Logic...')
  const { data: branchData, error } = await supabase.from('branches').select('*')
  
  if (error) {
    console.error('❌ Frontend Fetch FAILED:', error.message)
    // Check if it is an RLS issue
    if (error.code === '42501') {
        console.error('>> This is a PERMISSION DENIED (RLS) error. The Anon key cannot read the table.')
    }
  } else {
    console.log(`✅ Frontend Fetch SUCCESS. Found ${branchData.length} branches.`)
    console.log(branchData)
  }
}

debugFrontendFetch()
