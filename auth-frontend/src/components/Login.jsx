import { useState } from "react";
import { apiFetch, saveTokens, saveUser, getError } from "../api";

export default function Login({ onLogin, onGoRegister, onGoForgot }) {
  const [form, setForm]   = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(null);
  const [busy, setBusy]   = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.email || !form.password) return setAlert({ type: "error", msg: "Please fill in all fields." });
    setAlert(null); setBusy(true);
    const { ok, data } = await apiFetch("/login/", { method: "POST", body: form });
    if (!ok) { setAlert({ type: "error", msg: getError(data) }); }
    else { saveTokens(data.tokens); saveUser(data.user); onLogin(data.user); }
    setBusy(false);
  };

  return (
    <div className="auth-card">
      <h2>Welcome back</h2>
      <p className="auth-card-sub">Sign in to your account to continue.</p>

      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

      <div className="fg">
        <label>Email Address</label>
        <input type="email" placeholder="you@example.com" value={form.email}
          onChange={e => set("email", e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()} />
      </div>
      <div className="fg">
        <label>Password</label>
        <input type="password" placeholder="••••••••" value={form.password}
          onChange={e => set("password", e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()} />
      </div>

      <div style={{ textAlign: "right", marginBottom: 16, marginTop: -8 }}>
        <button className="link" style={{ fontSize: 13 }} onClick={onGoForgot}>Forgot password?</button>
      </div>

      <button className="btn btn-primary" onClick={submit} disabled={busy}>
        {busy ? "Signing in…" : "Sign In →"}
      </button>

      <p className="text-sm text-center">
        Don't have an account?{" "}
        <button className="link" onClick={onGoRegister}>Create one</button>
      </p>
    </div>
  );
}
