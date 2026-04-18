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
    <div className="min-h-screen px-12 py-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-black text-white">Admin Panel</h1>
        <a href="/" className="text-sm text-[#38bdf8] hover:underline">← Back to site</a>
      </div>
      {children}
    </div>
  )
}
