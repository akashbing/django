import { apiFetch, getAccess, getRefresh, clearAuth } from "../api";

export default function Dashboard({ user, onLogout }) {
  const initial = user.name?.charAt(0).toUpperCase() || "✦";
  const joined  = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  const logout = async () => {
    const r = getRefresh();
    if (r) await apiFetch("/logout/", { method: "POST", body: { refresh: r }, token: getAccess() });
    clearAuth();
    onLogout();
  };

  return (
    <div className="dash">
      <nav className="dash-nav">
        <div className="brand">Bohème<span className="brand-dot"> ✦ </span>Auth</div>
        <div className="nav-right">
          <div className="avatar">{initial}</div>
          <span className="nav-name">{user.name}</span>
          <button className="btn-sm" onClick={logout}>Depart</button>
        </div>
      </nav>

      <div className="dash-body">
        <div className="dash-eyebrow">✦ &nbsp; Your Sanctuary</div>
        <h1 className="dash-greeting">
          Welcome home, <em>{user.name?.split(" ")[0]}</em>.
        </h1>
        <p className="dash-sub">
          You are securely signed in. Your details rest safely in PostgreSQL via Django.
        </p>

        <div className="dash-divider">✦ ✦ ✦</div>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Your Name</div>
            <div className="stat-value" style={{ fontSize: 22, marginTop: 6 }}>{user.name}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Member Since</div>
            <div className="stat-value terra" style={{ fontSize: 17, marginTop: 6 }}>{joined}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Traveller ID</div>
            <div className="stat-value gold">№ {user.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
