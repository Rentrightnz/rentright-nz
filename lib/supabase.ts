import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Landlord = {
  id: string
  name: string
  email: string
  location: string
  slug: string
  claimed: boolean
  verified: boolean
  subscription: string
  created_at: string
}

export type Review = {
  id: string
  landlord_id: string
  rating: number
  text: string
  verified: boolean
  flagged: boolean
  helpful_count: number
  discrimination_flag: boolean
  created_at: string
}

export type TribunalRecord = {
  id: string
  landlord_id: string
  case_number: string
  case_type: string
  outcome: string
  case_date: string
  source_url: string
}
