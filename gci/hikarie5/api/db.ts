import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ''
export const BACKEND_SECRET = 'memu-backend-secure-ops'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key')
} else {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Anon Key Length:', supabaseAnonKey.length)
}

// Create a Supabase client with the Anon Key
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
