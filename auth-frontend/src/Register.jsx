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
      <div className="card-eyebrow">
        <span className="card-eyebrow-text">A New Chapter</span>
      </div>
      <h2>Create account</h2>
      <p className="auth-card-sub">Join the community. It only takes a moment.</p>

      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

      <div className="fg">
        <label>Your Name</label>
        <input placeholder="How shall we call you?" value={form.name} onChange={e => set("name", e.target.value)} />
      </div>
      <div className="fg">
        <label>Email Address</label>
        <input type="email" placeholder="your@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
      </div>
      <div className="fg">
        <label>Password</label>
        <input type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => set("password", e.target.value)} />
      </div>
      <div className="fg">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={form.password2}
          onChange={e => set("password2", e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
        />
      </div>

      <button className="btn btn-primary" onClick={submit} disabled={busy}>
        {busy ? "Creating…" : "✦  Begin Journey  ✦"}
      </button>

      <div className="ornamental-row">✦</div>

      <p className="text-sm text-center">
        Already a member?{" "}
        <button className="link" onClick={onGoLogin}>Return home</button>
      </p>
    </div>
  );
}
