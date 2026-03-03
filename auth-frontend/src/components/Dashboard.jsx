import { apiFetch, getAccess, getRefresh, clearAuth } from "../api";

export default function Dashboard({ user, onLogout }) {
  const initial = user.name?.charAt(0).toUpperCase() || "?";
  const joined  = user.created_at ? new Date(user.created_at).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" }) : "—";

  const logout = async () => {
    const r = getRefresh();
    if (r) await apiFetch("/logout/", { method: "POST", body: { refresh: r }, token: getAccess() });
    clearAuth();
    onLogout();
  };

  return (
    <div className="dash">
      <nav className="dash-nav">
        <div className="brand">auth<span>.</span>app</div>
        <div className="nav-right">
          <div className="avatar">{initial}</div>
          <span className="nav-name">{user.name}</span>
          <button className="btn-sm" onClick={logout}>Sign out</button>
        </div>
      </nav>
      <div className="dash-body">
        <h1 className="dash-greeting">Good to see you, <span>{user.name?.split(" ")[0]}</span>.</h1>
        <p className="dash-sub">You're logged in. Your data is securely stored in PostgreSQL via Django.</p>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Account Name</div>
            <div className="stat-value" style={{ fontSize: 20, marginTop: 6 }}>{user.name}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Member Since</div>
            <div className="stat-value orange" style={{ fontSize: 16, marginTop: 6 }}>{joined}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">User ID</div>
            <div className="stat-value teal">#{user.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
