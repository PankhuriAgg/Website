
'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type About = { id?: string; heading: string; bio: string; fun_facts: string[] }
const empty: About = { heading: 'About Me', bio: '', fun_facts: [] }

export default function AboutClient({ initial }: { initial: About | null }) {
  const [form, setForm] = useState<About>(initial || empty)
  const [factsInput, setFactsInput] = useState((initial?.fun_facts || []).join('\n'))
  const [msg, setMsg] = useState('')
  const supabase = createClient()

  const save = async () => {
    const payload = {
      heading: form.heading,
      bio: form.bio,
      fun_facts: factsInput.split('\n').map(f => f.trim()).filter(Boolean),
      updated_at: new Date().toISOString(),
    }

    if (form.id) {
      await supabase.from('about_me').update(payload).eq('id', form.id)
    } else {
      const { data } = await supabase.from('about_me').insert(payload).select().single()
      if (data) setForm(f => ({ ...f, id: data.id }))
    }

    setMsg('Saved!')
    setTimeout(() => setMsg(''), 2000)
  }

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="card p-6 flex flex-col gap-4">
        <h2 className="text-white font-bold text-xl">Edit About Me</h2>

        <div>
          <label className="text-[#475569] text-xs uppercase tracking-widest font-bold block mb-2">Heading</label>
          <input
            value={form.heading}
            onChange={e => setForm(f => ({ ...f, heading: e.target.value }))}
            className="w-full bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8]"
          />
        </div>

        <div>
          <label className="text-[#475569] text-xs uppercase tracking-widest font-bold block mb-2">Bio</label>
          <textarea
            value={form.bio}
            onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
            rows={5}
            className="w-full bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8] resize-none"
          />
        </div>

        <div>
          <label className="text-[#475569] text-xs uppercase tracking-widest font-bold block mb-2">
            Fun Facts — one per line
          </label>
          <textarea
            value={factsInput}
            onChange={e => setFactsInput(e.target.value)}
            rows={6}
            placeholder={"I debug best at 2am\nI love black holes"}
            className="w-full bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8] resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={save}
            className="bg-[#38bdf8] text-[#060912] font-bold px-6 py-2.5 rounded-lg hover:bg-[#7dd3fc] transition text-sm"
          >
            Save
          </button>
          {msg && <span className="text-green-400 text-sm">{msg}</span>}
        </div>
      </div>
    </div>
  )
}
