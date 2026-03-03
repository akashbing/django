import { useState } from "react";
import { apiFetch, getError } from "../api";

export default function ForgotPassword({ onGoLogin }) {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);
  const [busy, setBusy]   = useState(false);
  const [sent, setSent]   = useState(false);

  const submit = async () => {
    if (!email) return setAlert({ type: "error", msg: "Please enter your email address." });
    setAlert(null); setBusy(true);
    const { ok, data } = await apiFetch("/forgot-password/", { method: "POST", body: { email } });
    if (!ok) { setAlert({ type: "error", msg: getError(data) }); }
    else { setSent(true); }
    setBusy(false);
  };

  if (sent) return (
    <div className="auth-card" style={{ textAlign: "center" }}>
      <div className="success-icon">📬</div>
      <h2>Check your inbox</h2>
      <p className="auth-card-sub" style={{ marginBottom: 24 }}>
        We sent a password reset link to <strong>{email}</strong>. Check your spam folder if you don't see it.
      </p>
      <button className="btn btn-secondary" onClick={onGoLogin}>← Back to Sign In</button>
    </div>
  );

  return (
    <div className="auth-card">
      <h2>Forgot password?</h2>
      <p className="auth-card-sub">Enter your email and we'll send you a reset link.</p>

      {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

      <div className="fg">
        <label>Email Address</label>
        <input type="email" placeholder="you@example.com" value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()} />
      </div>

      <button className="btn btn-primary" onClick={submit} disabled={busy}>
        {busy ? "Sending…" : "Send Reset Link →"}
      </button>
      <button className="btn btn-secondary" onClick={onGoLogin}>← Back to Sign In</button>
    </div>
  );
}
