
import { createClient } from '@/lib/supabase/server'
import AdminProjectsClient from '@/components/admin/ProjectsClient'

export default async function AdminProjects() {
  const supabase = await createClient()
  const { data } = await supabase.from('projects').select('*').order('order_index')
  return <AdminProjectsClient initial={data || []} />
}
