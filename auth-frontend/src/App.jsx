import { useState, useEffect } from "react";
import css from "./styles";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import { apiFetch, getAccess, loadUser, clearAuth, saveUser } from "./api";

const LEFT_CONTENT = {
  login:    { title: <>Wander back<br/>into your <em>world</em></>, sub: "Your journey continues. Sign in to access your sanctuary." },
  register: { title: <>Begin your<br/><em>journey</em> with us</>, sub: "Every great adventure starts with a single step. Create your account." },
  forgot:   { title: <>Find your<br/>way <em>back</em></>, sub: "A gentle nudge — we'll send a reset link to your inbox." },
  reset:    { title: <>A <em>fresh</em><br/>beginning</>, sub: "Set a strong new password and reclaim your sanctuary." },
};

export default function App() {
  const [page, setPage]   = useState("login");
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (t) { setToken(t); setPage("reset"); }
  }, []);

  useEffect(() => {
    const stored = loadUser();
    const access = getAccess();
    if (stored && access) {
      apiFetch("/profile/", { token: access }).then(({ ok, data }) => {
        if (ok) { saveUser(data); setUser(data); }
        else clearAuth();
      });
    }
  }, []);

  const handleLogin  = u => setUser(u);
  const handleLogout = () => { setUser(null); setPage("login"); };

  if (user) return (<><style>{css}</style><Dashboard user={user} onLogout={handleLogout} /></>);

  const left = LEFT_CONTENT[page] || LEFT_CONTENT.login;

  return (
    <>
      <style>{css}</style>
      <div className="auth-wrap">

        {/* ── Left decorative panel ───────────────────────────── */}
        <div className="auth-left">
          <div className="brand">Bohème<span className="brand-dot"> ✦ </span>Auth</div>

          <div className="auth-left-body">
            <div className="ornament">
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line right" />
            </div>
            <h1 className="auth-left-title">{left.title}</h1>
            <p className="auth-left-sub">{left.sub}</p>
          </div>

          <div className="auth-left-footer">
            ✦ &nbsp; Crafted with care &nbsp; · &nbsp; Django + React &nbsp; · &nbsp; © 2026
          </div>
        </div>

        {/* ── Right form panel ────────────────────────────────── */}
        <div className="auth-right">
          {page === "login"    && <Login    onLogin={handleLogin}  onGoRegister={() => setPage("register")} onGoForgot={() => setPage("forgot")} />}
          {page === "register" && <Register onLogin={handleLogin}  onGoLogin={() => setPage("login")} />}
          {page === "forgot"   && <ForgotPassword onGoLogin={() => setPage("login")} />}
          {page === "reset"    && <ResetPassword  token={token} onGoLogin={() => { setPage("login"); window.history.replaceState({}, "", "/"); }} />}
        </div>

      </div>
    </>
  );
}
