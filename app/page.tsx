import PageClient from '@/components/PageClient'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  const [{ data: education, error: e1 }, { data: projects, error: e2 }, { data: skills, error: e3 }, { data: contacts, error: e4 }] =
    await Promise.all([
      supabase.from('education').select('*').order('order_index'),
      supabase.from('projects').select('*').order('order_index'),
      supabase.from('skills').select('*').order('order_index'),
      supabase.from('contacts').select('*').order('order_index'),
    ])

  console.log('education:', education, e1)
  console.log('projects:', projects, e2)
  console.log('skills:', skills, e3)
  console.log('contacts:', contacts, e4)

  return (
    <PageClient
      education={education || []}
      projects={projects || []}
      skills={skills || []}
      contacts={contacts || []}
    />
  )
}
