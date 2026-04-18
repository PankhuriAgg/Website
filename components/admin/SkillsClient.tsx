
'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Item = { id: string; category: string; items: string[] }
const empty = { id: '', category: '', items: [] }

export default function SkillsClient({ initial }: { initial: Item[] }) {
  const [items, setItems] = useState<Item[]>(initial)
  const [form, setForm] = useState<Item>(empty)
  const [skillsInput, setSkillsInput] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const supabase = createClient()

  const refresh = async () => {
    const { data } = await supabase.from('skills').select('*').order('order_index')
    setItems(data || [])
  }

  const save = async () => {
    const payload = { ...form, items: skillsInput.split(',').map(s => s.trim()).filter(Boolean) }
    if (editing) {
      await supabase.from('skills').update(payload).eq('id', editing)
    } else {
      await supabase.from('skills').insert(payload)
    }
    setForm(empty)
    setSkillsInput('')
    setEditing(null)
    setMsg('Saved!')
    setTimeout(() => setMsg(''), 2000)
    refresh()
  }

  const del = async (id: string) => {
    await supabase.from('skills').delete().eq('id', id)
    refresh()
  }

  const edit = (item: Item) => {
    setForm(item)
    setSkillsInput((item.items || []).join(', '))
    setEditing(item.id)
  }

  return (
    <div className="max-w-2xl flex flex-col gap-8">
      <div className="card p-6 flex flex-col gap-4">
        <h2 className="text-white font-bold text-xl">{editing ? 'Edit Category' : 'Add Category'}</h2>
        <input
          placeholder="Category (e.g. Languages)"
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          className="bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8]"
        />
        <input
          placeholder="Skills (comma separated e.g. Python, C++, JavaScript)"
          value={skillsInput}
          onChange={e => setSkillsInput(e.target.value)}
          className="bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8]"
        />
        <div className="flex gap-3">
          <button onClick={save} className="bg-[#38bdf8] text-[#060912] font-bold px-5 py-2 rounded-lg hover:bg-[#7dd3fc] transition text-sm">
            {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button onClick={() => { setForm(empty); setSkillsInput(''); setEditing(null) }} className="text-sm text-[#475569] hover:text-white">
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
              <p className="text-white font-bold">{item.category}</p>
              <p className="text-[#475569] text-sm mt-1">{(item.items || []).join(', ')}</p>
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
