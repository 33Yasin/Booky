import React, { useState } from "react";
import toast from "react-hot-toast";

const RegisterCard = ({ onClose, onSwitchToLogin }) => {
  // State for form fields and status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Send registration request to the API
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      // Safe response parsing handling different content types
      const contentType = res.headers.get("content-type") || "";
      let data = null;
      if (contentType.includes("application/json")) {
        try {
          data = await res.json();
        } catch {
          data = null;
        }
      } else {
        try {
          const text = await res.text();
          data = JSON.parse(text);
        } catch {
          data = null;
        }
      }

      // Check for API errors
      if (!res.ok) throw new Error(data?.message || "Registration failed");

      // Notify success and switch to login view
      toast.success("Registration successful. Redirecting to login...");
      setTimeout(() => {
        onSwitchToLogin && onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Modal Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 w-full max-w-sm rounded-xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          aria-label="Close"
          className="btn btn-sm btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* Error Alert */}
        {error && <div className="alert alert-error text-sm mb-2">{error}</div>}

        {/* Registration Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text">Full Name</span>
            </label>
            <input
              id="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="example@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          Already a member?{" "}
          <button className="link link-primary" onClick={onSwitchToLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
