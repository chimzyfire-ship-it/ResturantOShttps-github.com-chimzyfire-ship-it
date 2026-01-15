import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfrnbtvoqjansyapnqvc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcm5idHZvcWphbnN5YXBucXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyODk1NDYsImV4cCI6MjA4Mzg2NTU0Nn0.WOQ7xPJOxHhitlJHqrp6gEDS5N03xE-x75mbwe8xpe8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
