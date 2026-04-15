import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{ width: 220, padding: '2rem 1rem', borderRight: '1px solid #eee' }}>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Admin</p>
        <a href="/admin" style={{ display: 'block', marginBottom: 8 }}>Dashboard</a>
        <a href="/admin/settings" style={{ display: 'block', marginBottom: 8 }}>Settings</a>
      </nav>
      <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
    </div>
  )
}
