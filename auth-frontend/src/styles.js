const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cormorant+SC:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:  #f5ede0;
    --parchment2: #ede0cb;
    --terracotta: #c4623a;
    --terra-dark: #9e4a28;
    --sage:       #7a8c6e;
    --sage-light: #a8b89a;
    --burgundy:   #6b2d3e;
    --gold:       #c9943a;
    --gold-light: #e8c97a;
    --ink:        #2c1f14;
    --ink-light:  #5c4033;
    --muted:      #9c8272;
    --border:     #d9c9b3;
    --error:      #9e2a2a;
    --success:    #3d6b45;
  }

  body {
    background: var(--parchment);
    color: var(--ink);
    font-family: 'Jost', sans-serif;
    min-height: 100vh;
  }

  .auth-wrap {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    position: relative;
    z-index: 1;
  }

  .auth-left {
    background: var(--ink);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 56px;
    position: relative;
    overflow: hidden;
  }

  .auth-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 80%, rgba(122,140,110,0.25) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 20%, rgba(196,98,58,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(107,45,62,0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .auth-left::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 340px;
    height: 340px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='rgba(201,148,58,0.18)' stroke-width='0.8'%3E%3Ccircle cx='100' cy='100' r='80'/%3E%3Ccircle cx='100' cy='100' r='60'/%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3Cpath d='M100 20 Q130 60 100 100 Q70 60 100 20'/%3E%3Cpath d='M100 180 Q130 140 100 100 Q70 140 100 180'/%3E%3Cpath d='M20 100 Q60 130 100 100 Q60 70 20 100'/%3E%3Cpath d='M180 100 Q140 130 100 100 Q140 70 180 100'/%3E%3Cpath d='M36 36 Q68 68 100 100'/%3E%3Cpath d='M164 36 Q132 68 100 100'/%3E%3Cpath d='M36 164 Q68 132 100 100'/%3E%3Cpath d='M164 164 Q132 132 100 100'/%3E%3C/g%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
    opacity: 0.7;
  }

  .brand {
    font-family: 'Cormorant SC', serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--gold-light);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
  }

  .brand-dot { color: var(--terracotta); }

  .auth-left-body { position: relative; z-index: 1; }

  .ornament { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
  .ornament-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(201,148,58,0.5)); }
  .ornament-line.right { background: linear-gradient(to left, transparent, rgba(201,148,58,0.5)); }
  .ornament-diamond { width: 8px; height: 8px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }

  .auth-left-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
    font-style: italic;
    color: var(--parchment);
    line-height: 1.15;
    margin-bottom: 20px;
    letter-spacing: -0.5px;
  }

  .auth-left-title em { font-style: normal; color: var(--gold-light); }

  .auth-left-sub {
    color: rgba(245,237,224,0.5);
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
    letter-spacing: 0.02em;
  }

  .auth-left-footer { color: rgba(245,237,224,0.25); font-size: 12px; letter-spacing: 0.08em; position: relative; z-index: 1; }

  .auth-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 56px;
    background: var(--parchment);
    position: relative;
  }

  .auth-right::before {
    content: 'ᛟ';
    position: absolute;
    top: 28px; right: 36px;
    color: var(--gold);
    font-size: 20px;
    opacity: 0.25;
  }

  .auth-right::after {
    content: 'ᛟ';
    position: absolute;
    bottom: 28px; left: 36px;
    color: var(--sage);
    font-size: 16px;
    opacity: 0.25;
  }

  .auth-card {
    width: 100%;
    max-width: 380px;
    animation: driftUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes driftUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: none; }
  }

  .card-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .card-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--gold); }
  .card-eyebrow-text {
    font-family: 'Cormorant SC', serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .auth-card h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 6px;
    letter-spacing: -0.3px;
    line-height: 1.1;
  }

  .auth-card-sub { color: var(--muted); font-size: 14px; font-weight: 300; margin-bottom: 30px; letter-spacing: 0.02em; }

  .fg { margin-bottom: 18px; }

  label {
    display: block;
    font-family: 'Cormorant SC', serif;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-light);
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    background: rgba(255,255,255,0.6);
    border: 1px solid var(--border);
    border-bottom: 2px solid var(--border);
    border-radius: 4px;
    padding: 11px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 15px;
    font-weight: 300;
    color: var(--ink);
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    letter-spacing: 0.02em;
  }

  input:focus {
    background: rgba(255,255,255,0.9);
    border-color: var(--gold);
    border-bottom-color: var(--terracotta);
    box-shadow: 0 4px 16px rgba(196,98,58,0.08);
  }

  input::placeholder { color: #c4b5a5; font-style: italic; }

  .btn {
    width: 100%;
    padding: 13px;
    border: none;
    cursor: pointer;
    font-family: 'Cormorant SC', serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    transition: all 0.3s ease;
    margin-top: 6px;
    border-radius: 3px;
    position: relative;
    overflow: hidden;
  }

  .btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-primary {
    background: linear-gradient(135deg, var(--terracotta), var(--terra-dark));
    color: var(--parchment);
    box-shadow: 0 4px 16px rgba(196,98,58,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
  }

  .btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #d4714a, var(--terracotta));
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(196,98,58,0.4);
  }

  .btn-secondary {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
    margin-top: 10px;
  }

  .btn-secondary:hover:not(:disabled) { border-color: var(--sage); color: var(--sage); background: rgba(122,140,110,0.06); }

  .alert {
    padding: 11px 14px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 300;
    margin-bottom: 18px;
    animation: driftUp 0.3s ease;
    letter-spacing: 0.02em;
    border-left: 3px solid;
  }

  .alert-error   { background: rgba(158,42,42,0.07);  border-color: var(--error);   color: var(--error); }
  .alert-success { background: rgba(61,107,69,0.07);  border-color: var(--success); color: var(--success); }
  .alert-info    { background: rgba(201,148,58,0.08); border-color: var(--gold);    color: var(--terra-dark); }

  .link {
    color: var(--terracotta);
    font-weight: 400;
    cursor: pointer;
    background: none;
    border: none;
    font-size: inherit;
    font-family: inherit;
    padding: 0;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .link:hover { border-bottom-color: var(--terracotta); }

  .text-center { text-align: center; }
  .text-sm { font-size: 13px; color: var(--muted); margin-top: 20px; font-weight: 300; }

  .ornamental-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 18px 0 14px;
    color: var(--border);
    font-size: 11px;
    letter-spacing: 0.2em;
  }

  .ornamental-row::before, .ornamental-row::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .forgot-row { text-align: right; margin: -10px 0 18px; }

  .dash { min-height: 100vh; background: var(--parchment); animation: driftUp 0.5s ease both; }

  .dash-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 56px;
    background: var(--ink);
    border-bottom: 1px solid rgba(201,148,58,0.2);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .nav-right { display: flex; align-items: center; gap: 14px; }

  .avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, var(--burgundy), var(--terracotta));
    border: 1.5px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant SC', serif;
    font-weight: 600; font-size: 15px; color: var(--parchment);
  }

  .nav-name { font-size: 14px; font-weight: 300; color: rgba(245,237,224,0.7); letter-spacing: 0.04em; }

  .btn-sm {
    padding: 7px 16px;
    border-radius: 3px;
    border: 1px solid rgba(201,148,58,0.3);
    background: transparent;
    color: rgba(245,237,224,0.4);
    font-family: 'Cormorant SC', serif;
    font-size: 11px;
    letter-spacing: 0.15em;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-sm:hover { border-color: var(--terracotta); color: var(--gold-light); }

  .dash-body { padding: 64px 56px; max-width: 1000px; margin: 0 auto; }

  .dash-eyebrow {
    font-family: 'Cormorant SC', serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .dash-greeting {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 300;
    font-style: italic;
    letter-spacing: -1px;
    margin-bottom: 10px;
    line-height: 1.1;
    color: var(--ink);
  }

  .dash-greeting em { font-style: normal; color: var(--terracotta); }
  .dash-sub { color: var(--muted); font-size: 15px; font-weight: 300; margin-bottom: 44px; letter-spacing: 0.02em; }

  .dash-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 36px;
    color: var(--gold);
    font-size: 13px;
    letter-spacing: 0.3em;
  }

  .dash-divider::before {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--border));
  }

  .dash-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to left, transparent, var(--border));
  }

  .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  .stat-card {
    background: rgba(255,255,255,0.55);
    border: 1px solid var(--border);
    border-top: 3px solid var(--gold);
    border-radius: 4px;
    padding: 26px 24px;
    transition: box-shadow 0.25s, transform 0.25s;
    position: relative;
    overflow: hidden;
  }

  .stat-card:hover { box-shadow: 0 8px 28px rgba(44,31,20,0.1); transform: translateY(-2px); }

  .stat-label {
    font-family: 'Cormorant SC', serif;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
  }

  .stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.5px;
  }

  .stat-value.terra { color: var(--terracotta); }
  .stat-value.sage  { color: var(--sage); }
  .stat-value.gold  { color: var(--gold); }

  .success-icon {
    width: 60px; height: 60px; border-radius: 50%;
    background: rgba(61,107,69,0.08);
    border: 1.5px solid rgba(61,107,69,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; margin: 0 auto 20px;
  }

  @media (max-width: 768px) {
    .auth-wrap { grid-template-columns: 1fr; }
    .auth-left { display: none; }
    .auth-right { padding: 40px 28px; }
    .stat-grid { grid-template-columns: 1fr; }
    .dash-nav, .dash-body { padding-left: 24px; padding-right: 24px; }
    .dash-greeting { font-size: 36px; }
  }
`;
export default css;
