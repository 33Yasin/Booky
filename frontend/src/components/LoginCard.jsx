 import React, { useState } from 'react'
 import toast from 'react-hot-toast'

const LoginCard = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      // Safe response parsing
      const contentType = res.headers.get('content-type') || ''
      let data = null
      if (contentType.includes('application/json')) {
        try { data = await res.json() } catch { data = null }
      } else {
        try { const text = await res.text(); data = JSON.parse(text) } catch { data = null }
      }

      if (!res.ok) throw new Error(data?.message || "Giriş başarısız")

      // Save token and user
      if (data?.token) localStorage.setItem("token", data.token)
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user))

      // Toast success then redirect
      toast.success("Giriş başarılı. Yönlendiriliyor...")
      setTimeout(() => { window.location.href = "/" }, 2000)
    } catch (err) {
      setError(err.message)
      toast.error(err.message || "Giriş başarısız")
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

        <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>

        {error && (
          <div className="alert alert-error text-sm mb-2">{error}</div>
        )}
        <form className="space-y-3" onSubmit={handleSubmit}>
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
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          Üye değil misin?{' '}
          <button className="link link-primary" onClick={onSwitchToRegister}>Hemen kayıt ol</button>
        </div>
      </div>
    </div>
  )
}

export default LoginCard