import PageClient from '@/components/PageClient'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  const [
    { data: education },
    { data: projects },
    { data: skills },
    { data: contacts },
    { data: aboutData },
  ] = await Promise.all([
    supabase.from('education').select('*').order('order_index'),
    supabase.from('projects').select('*').order('order_index'),
    supabase.from('skills').select('*').order('order_index'),
    supabase.from('contacts').select('*').order('order_index'),
    supabase.from('about_me').select('*').limit(1),
  ])

  return (
    <PageClient
      education={education || []}
      projects={projects || []}
      skills={skills || []}
      contacts={contacts || []}
      about={aboutData?.[0] || null}
    />
  )
}
