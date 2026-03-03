import { useState, useEffect } from "react";
import { apiFetch, getError } from "../api";

export default function ResetPassword({ token, onGoLogin }) {
  const [form, setForm]     = useState({ password: "", password2: "" });
  const [alert, setAlert]   = useState(null);
  const [busy, setBusy]     = useState(false);
  const [valid, setValid]   = useState(null);
  const [done, setDone]     = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!token) { setValid(false); return; }
    apiFetch(`/validate-reset-token/?token=${token}`).then(({ data }) => setValid(data.valid));
  }, [token]);

  const submit = async () => {
    if (!form.password || !form.password2) return setAlert({ type: "error", msg: "Please fill in both fields." });
    setAlert(null); setBusy(true);
    const { ok, data } = await apiFetch("/reset-password/", { method: "POST", body: { token, ...form } });
    if (!ok) { setAlert({ type: "error", msg: getError(data) }); }
    else { setDone(true); }
    setBusy(false);
  };

  if (valid === null) return <div className="auth-card"><p className="auth-card-sub">Validating reset link…</p></div>;

  if (!valid) return (
    <div className="auth-card" style={{ textAlign: "center" }}>
      <div className="success-icon">❌</div>
      <h2>Link expired</h2>
      <p className="auth-card-sub" style={{ marginBottom: 24 }}>This reset link is invalid or has expired. Please request a new one.</p>
      <button className="btn btn-primary" onClick={onGoLogin}>Request New Link</button>
    </div>
  );

  if (done) return (
    <div className="auth-card" style={{ textAlign: "center" }}>
      <div className="success-icon">✅</div>
      <h2>Password reset!</h2>
      <p className="auth-card-sub" style={{ marginBottom: 24 }}>Your password has been changed successfully.</p>
      <button className="btn btn-primary" onClick={onGoLogin}>Sign In →</button>
    </div>
  );

  return (
    <div className="auth-card">
      <h2>Set new password</h2>
      <p className="auth-card-sub">Choose a strong password for your account.</p>

      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

      <div className="fg">
        <label>New Password</label>
        <input type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => set("password", e.target.value)} />
      </div>
      <div className="fg">
        <label>Confirm New Password</label>
        <input type="password" placeholder="••••••••" value={form.password2}
          onChange={e => set("password2", e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()} />
      </div>

      <button className="btn btn-primary" onClick={submit} disabled={busy}>
        {busy ? "Saving…" : "Reset Password →"}
      </button>
    </div>
  );
}
