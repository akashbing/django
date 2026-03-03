import { useState } from "react";
import { apiFetch, saveTokens, saveUser, getError } from "../api";

export default function Register({ onLogin, onGoLogin }) {
  const [form, setForm]   = useState({ name: "", email: "", password: "", password2: "" });
  const [alert, setAlert] = useState(null);
  const [busy, setBusy]   = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.email || !form.password || !form.password2)
      return setAlert({ type: "error", msg: "Please fill in all fields." });
    if (form.password !== form.password2)
      return setAlert({ type: "error", msg: "Passwords do not match." });
    setAlert(null); setBusy(true);
    const { ok, data } = await apiFetch("/register/", { method: "POST", body: form });
    if (!ok) { setAlert({ type: "error", msg: getError(data) }); }
    else { saveTokens(data.tokens); saveUser(data.user); onLogin(data.user); }
    setBusy(false);
  };

  return (
    <div className="auth-card">
      <h2>Create account</h2>
      <p className="auth-card-sub">Join us today — it only takes a minute.</p>

      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

      <div className="fg">
        <label>Full Name</label>
        <input placeholder="Jane Doe" value={form.name} onChange={e => set("name", e.target.value)} />
      </div>
      <div className="fg">
        <label>Email Address</label>
        <input type="email" placeholder="you@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
      </div>
      <div className="fg">
        <label>Password</label>
        <input type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => set("password", e.target.value)} />
      </div>
      <div className="fg">
        <label>Confirm Password</label>
        <input type="password" placeholder="••••••••" value={form.password2}
          onChange={e => set("password2", e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()} />
      </div>

      <button className="btn btn-primary" onClick={submit} disabled={busy}>
        {busy ? "Creating account…" : "Create Account →"}
      </button>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <button className="link" onClick={onGoLogin}>Sign in</button>
      </p>
    </div>
  );
}
