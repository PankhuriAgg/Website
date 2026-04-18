
import { createClient } from '@/lib/supabase/server'
import AdminSkillsClient from '@/components/admin/SkillsClient'

export default async function AdminSkills() {
  const supabase = await createClient()
  const { data } = await supabase.from('skills').select('*').order('order_index')
  return <AdminSkillsClient initial={data || []} />
}
