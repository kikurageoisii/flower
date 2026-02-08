
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

console.log('Testing Supabase Connection...')
console.log('URL:', supabaseUrl)
console.log('Key Length:', supabaseServiceKey.length)

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function test() {
  try {
    // Try to fetch users count
    const { count, error: countError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Count Error:', countError)
    } else {
      console.log('Users Count:', count)
    }

    // Try to insert a dummy diary entry (will fail if user doesn't exist, but we can check if auth works)
    // We'll just check if we can query diary_entries
    const { data, error } = await supabase
      .from('diary_entries')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Select Diary Error:', error)
    } else {
      console.log('Select Diary Success:', data)
    }

  } catch (err) {
    console.error('Script Error:', err)
  }
}

test()
