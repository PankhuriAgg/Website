
'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const login = async () => {
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); return }
    router.push('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="card p-8 w-full max-w-sm flex flex-col gap-5">
        <h1 className="text-2xl font-black text-white">Admin Login</h1>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="bg-[#0c1528] border border-[#1a2744] text-white px-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#38bdf8]"
        />
        <button
          onClick={login}
          className="bg-[#38bdf8] text-[#060912] font-bold py-2.5 rounded-lg hover:bg-[#7dd3fc] transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}
