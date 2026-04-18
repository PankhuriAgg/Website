
import { createClient } from '@/lib/supabase/server'
import AdminEducationClient from '@/components/admin/EducationClient'

export default async function AdminEducation() {
  const supabase = await createClient()
  const { data } = await supabase.from('education').select('*').order('order_index')
  return <AdminEducationClient initial={data || []} />
}
