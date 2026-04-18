'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Item = { id: string; label: string; value: string; href: string; icon_name: string }
const empty = { id: '', label: '', value: '', href: '', icon_name: 'mail' }

export default function ContactsClient({ initial }: { initial: Item[] }) {
  const [items, setItems] = useState<Item[]>(initial)
  const [form, setForm] = useState<Item>(empty)
  const [editing, setEditing] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const supabase = createClient()

  const refresh = async () => {
    const { data } = await supabase.from('contacts').select('*').order('order_index')
    setItems(data || [])
  }

  const save = async () => {
    if (editing) {
      await supabase.from('contacts').update(form).eq('id', editing)
    } else {
      await supabase.from('contacts').insert(form)
    }
    setForm(empty)
    setEditing(null)
    setMsg('Saved!')
    setTimeout(() => setMsg(''), 2000)
    refresh()
  }

  const del = async (id: string) => {
    await supabase.from('contacts').delete().eq('id', id)
    refresh()
  }

  const edit = (item: Item) => {
    setForm(item)
    setEditing(item.id)
  }

  return (
    <div className="max-w-2xl flex flex-col gap-8">
      <div className="card p-6 flex flex-col gap-4">
        <h2 className="text-white font-bold text-xl">{editing ? 'Edit Contact' : 'Add Contact'}</h2>
        {(['label', 'value', 'href'] as const).map(field => (
          <input
            key={field}
            placeholder={field === 'href' ? 'Link (e.g. https://github.com/...)' : field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
            className="bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8]"
          />
        ))}
        <select
          value={form.icon_name}
          onChange={e => setForm(f => ({ ...f, icon_name: e.target.value }))}
          className="bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8]"
        >
          <option value="mail">Email</option>
          <option value="git-branch">GitHub</option>
          <option value="link">LinkedIn</option>
        </select>
        <div className="flex gap-3">
          <button onClick={save} className="bg-[#38bdf8] text-[#060912] font-bold px-5 py-2 rounded-lg hover:bg-[#7dd3fc] transition text-sm">
            {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button onClick={() => { setForm(empty); setEditing(null) }} className="text-sm text-[#475569] hover:text-white">
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
              <p className="text-white font-bold">{item.label}</p>
              <p className="text-[#38bdf8] text-sm">{item.value}</p>
              <p className="text-[#475569] text-xs mt-1">{item.href}</p>
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
