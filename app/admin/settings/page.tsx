import { createClient } from '@/lib/supabase/server'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('settings').select('*')

  return (
    <div>
      <h1>Site Settings</h1>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  )
}
