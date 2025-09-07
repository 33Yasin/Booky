 import React, { useState } from 'react'
 import toast from 'react-hot-toast'

const RegisterCard = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
      // Safe response parsing
      const contentType = res.headers.get('content-type') || ''
      let data = null
      if (contentType.includes('application/json')) {
        try { data = await res.json() } catch { data = null }
      } else {
        try { const text = await res.text(); data = JSON.parse(text) } catch { data = null }
      }

      if (!res.ok) throw new Error(data?.message || "Kayıt başarısız")

      toast.success("Kayıt başarılı. Giriş ekranına yönlendiriliyorsunuz...")
      setTimeout(() => { onSwitchToLogin && onSwitchToLogin() }, 2000)
    } catch (err) {
      setError(err.message)
      toast.error(err.message || "Kayıt başarısız")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 w-full max-w-sm rounded-xl shadow-xl p-6 relative">
        {/* Close */}
        <button
          aria-label="Kapat"
          className="btn btn-sm btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Kayıt Ol</h2>

        {error && (
          <div className="alert alert-error text-sm mb-2">{error}</div>
        )}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text">Ad Soyad</span>
            </label>
            <input id="name" type="text" className="input input-bordered w-full" placeholder="Adınız Soyadınız" required value={name} onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">E-posta</span>
            </label>
            <input id="email" type="email" className="input input-bordered w-full" placeholder="ornek@mail.com" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Şifre</span>
            </label>
            <input id="password" type="password" className="input input-bordered w-full" placeholder="••••••••" required value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2" disabled={loading}>
            {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          Zaten üye misin?{' '}
          <button className="link link-primary" onClick={onSwitchToLogin}>Giriş yap</button>
        </div>
      </div>
    </div>
  )
}

export default RegisterCard