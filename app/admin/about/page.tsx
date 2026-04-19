
import { createClient } from '@/lib/supabase/server'
import AdminAboutClient from '@/components/admin/AboutClient'

export default async function AdminAbout() {
  const supabase = await createClient()
  const { data } = await supabase.from('about_me').select('*').limit(1)
  return <AdminAboutClient initial={data?.[0] || null} />
}
