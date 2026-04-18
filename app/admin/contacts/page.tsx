import { createClient } from '@/lib/supabase/server'
import AdminContactsClient from '@/components/admin/ContactsClient'

export default async function AdminContacts() {
  const supabase = await createClient()
  const { data } = await supabase.from('contacts').select('*').order('order_index')
  return <AdminContactsClient initial={data || []} />
}
