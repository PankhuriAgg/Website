
'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Item = { id: string; title: string; tag: string; summary: string; description: string; tech: string[]; link: string }
const empty = { id: '', title: '', tag: '', summary: '', description: '', tech: [], link: '' }

export default function ProjectsClient({ initial }: { initial: Item[] }) {
  const [items, setItems] = useState<Item[]>(initial)
  const [form, setForm] = useState<Item>(empty)
  const [techInput, setTechInput] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const supabase = createClient()

  const refresh = async () => {
    const { data } = await supabase.from('projects').select('*').order('order_index')
    setItems(data || [])
  }

  const save = async () => {
    const payload = { ...form, tech: techInput.split(',').map(t => t.trim()).filter(Boolean) }
    if (editing) {
      await supabase.from('projects').update(payload).eq('id', editing)
    } else {
      await supabase.from('projects').insert(payload)
    }
    setForm(empty)
    setTechInput('')
    setEditing(null)
    setMsg('Saved!')
    setTimeout(() => setMsg(''), 2000)
    refresh()
  }

  const del = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id)
    refresh()
  }

  const edit = (item: Item) => {
    setForm(item)
    setTechInput((item.tech || []).join(', '))
    setEditing(item.id)
  }

  return (
    <div className="max-w-2xl flex flex-col gap-8">
      <div className="card p-6 flex flex-col gap-4">
        <h2 className="text-white font-bold text-xl">{editing ? 'Edit Project' : 'Add Project'}</h2>
        {(['title', 'tag', 'summary', 'link'] as const).map(field => (
          <input
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
            className="bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8]"
          />
        ))}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          rows={3}
          className="bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8] resize-none"
        />
        <input
          placeholder="Tech stack (comma separated e.g. Next.js, Tailwind)"
          value={techInput}
          onChange={e => setTechInput(e.target.value)}
          className="bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8]"
        />
        <div className="flex gap-3">
          <button onClick={save} className="bg-[#38bdf8] text-[#060912] font-bold px-5 py-2 rounded-lg hover:bg-[#7dd3fc] transition text-sm">
            {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button onClick={() => { setForm(empty); setTechInput(''); setEditing(null) }} className="text-sm text-[#475569] hover:text-white">
              Cancel
            </button>
          )}
          {msg && <span className="text-green-400 text-sm self-center">{msg}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="card p-5 flex justify-between items-start gap-4">
            <div>
              <p className="text-white font-bold">{item.title}</p>
              <p className="text-[#38bdf8] text-sm">{item.tag}</p>
              <p className="text-[#475569] text-xs mt-1">{(item.tech || []).join(', ')}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => edit(item)} className="text-sm text-[#38bdf8] hover:underline">Edit</button>
              <button onClick={() => del(item.id)} className="text-sm text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
