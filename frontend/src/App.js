import { useState } from "react";
import { Eye, EyeOff, Lock, User, ArrowRight, X } from "lucide-react";
import Dashboard from "@/Dashboard";
import "@/App.css";

const DEMO_EMPLOYEE = "BM-2024-001";
const DEMO_PASSWORD = "budgetmitra";

/* --------- Accurate IndianOil circular logo (SVG) --------- */
function IndianOilLogo({ size = 60 }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-label="IndianOil logo"
      className="iol-svg"
    >
      <defs>
        <radialGradient id="iolBg" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#FFC98A" />
          <stop offset="55%" stopColor="#F39A55" />
          <stop offset="100%" stopColor="#D95F1B" />
        </radialGradient>
      </defs>
      {/* outer golden ring */}
      <circle cx="60" cy="60" r="58" fill="url(#iolBg)" />
      <circle cx="60" cy="60" r="53" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.85" />

      {/* Red trishul / flame emblem (centered around 60,52) */}
      <g transform="translate(60 34)" fill="#B0231A">
        {/* center prong */}
        <path d="M-2.2 0 L2.2 0 L2.8 28 L-2.8 28 Z" />
        <path d="M0 -4 L4 6 L-4 6 Z" />
        {/* left prong */}
        <path d="M-9 6 C -14 10 -15 18 -12 28 L -8 28 C -10 20 -8 14 -5 10 Z" />
        <path d="M-12 2 L-8 8 L-14 10 Z" />
        {/* right prong */}
        <path d="M9 6 C 14 10 15 18 12 28 L 8 28 C 10 20 8 14 5 10 Z" />
        <path d="M12 2 L8 8 L14 10 Z" />
        {/* base horizontal bar */}
        <rect x="-13" y="28" width="26" height="4" rx="1.5" />
        {/* drop below */}
        <path d="M-7 32 L7 32 L4.5 40 L-4.5 40 Z" />
      </g>

      {/* Hindi text along bottom curve */}
      <path id="iolCurve" d="M 20 82 A 42 42 0 0 0 100 82" fill="none" />
      <text
        fontSize="11"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="'Noto Sans Devanagari', sans-serif"
        letterSpacing="0.3"
      >
        <textPath href="#iolCurve" startOffset="50%" textAnchor="middle">
          इंडियनऑयल
        </textPath>
      </text>
    </svg>
  );
}

/* --------- SPRINT logo (runner + wordmark + tagline) --------- */
function SprintLogo() {
  return (
    <svg
      viewBox="0 0 320 96"
      width="300"
      height="72"
      aria-label="SPRINT — A Transformational Project"
      className="sprint-svg"
    >
      <defs>
        <linearGradient id="runnerGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0A75B" />
          <stop offset="100%" stopColor="#D95F1B" />
        </linearGradient>
      </defs>

      {/* Dotted particle trail */}
      <g fill="#E97F3A">
        <circle cx="6"  cy="58" r="2.2" opacity="0.35"/>
        <circle cx="14" cy="64" r="2.4" opacity="0.5"/>
        <circle cx="24" cy="70" r="2.6" opacity="0.6"/>
        <circle cx="12" cy="74" r="2"  opacity="0.4"/>
        <circle cx="26" cy="82" r="2.4" opacity="0.55"/>
        <circle cx="4"  cy="68" r="1.6" opacity="0.3"/>
        <circle cx="20" cy="54" r="1.8" opacity="0.35"/>
        <circle cx="36" cy="78" r="2.2" opacity="0.5"/>
        <circle cx="42" cy="86" r="1.8" opacity="0.4"/>
        <circle cx="32" cy="88" r="1.6" opacity="0.35"/>
      </g>

      {/* Stylised runner silhouette leaning forward */}
      <g fill="url(#runnerGrad)">
        {/* head */}
        <circle cx="82" cy="18" r="8"/>
        {/* torso, front arm reaching, back leg */}
        <path d="
          M74 28
          L96 26
          L104 34
          L118 30
          L120 36
          L104 42
          L98 54
          L110 74
          L104 80
          L90 62
          L74 80
          L64 76
          L80 58
          L74 46
          L64 42
          L66 34
          Z" />
        {/* trailing back arm */}
        <path d="M74 32 L58 44 L52 42 L50 46 L64 50 L78 40 Z"/>
      </g>

      {/* SPRINT wordmark */}
      <text
        x="140" y="52"
        fontFamily="'Poppins', sans-serif"
        fontWeight="800"
        fontSize="42"
        fill="#1F3C88"
        letterSpacing="-1.5"
      >SPRINT</text>

      {/* Tagline banner */}
      <rect x="140" y="60" width="175" height="20" rx="2" fill="#E97F3A"/>
      <text
        x="227" y="74"
        textAnchor="middle"
        fontFamily="'Poppins', sans-serif"
        fontWeight="600"
        fontSize="10"
        fill="#ffffff"
        letterSpacing="0.3"
      >A Transformational Project</text>
    </svg>
  );
}

function App() {
  const [employeeNo, setEmployeeNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState(null);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeNo.trim() || !password.trim()) {
      setMessage({ type: "error", text: "Please enter your employee number and password." });
      return;
    }
    if (employeeNo === DEMO_EMPLOYEE && password === DEMO_PASSWORD) {
      setMessage({ type: "success", text: "Welcome to your Budget Mitra dashboard." });
      setTimeout(() => setAuthed(true), 450);
      return;
    }
    setMessage({ type: "error", text: "Invalid credentials. Try BM-2024-001 / budgetmitra." });
  };

  if (authed) {
    return <Dashboard onLogout={() => { setAuthed(false); setEmployeeNo(""); setPassword(""); setMessage(null); }} />;
  }

  return (
    <div className="page-root" data-testid="login-page">
      {/* Top header bar */}
      <header className="top-header" data-testid="top-header">
        <div className="header-left">
          <IndianOilLogo size={62} />
          <div className="iol-title">
            <div className="iol-title-main">IndianOil</div>
            <div className="iol-title-sub">The Energy Of India</div>
          </div>
        </div>
        <div className="header-right">
          <div className="sprint-block">
            <SprintLogo />
          </div>
          <div className="header-iol-small" aria-label="IndianOil small logo">
            <IndianOilLogo size={38} />
            <div className="header-iol-small-text">IndianOil</div>
          </div>
        </div>
      </header>

      <main className="login-shell">
        {/* Left panel */}
        <section className="brand-panel" data-testid="brand-panel">
          <div className="brand-inner">
            <div className="budget-brand" data-testid="budget-mitra-brand">
              <div className="rupee-badge" aria-hidden="true">
                <svg viewBox="0 0 200 200" width="180" height="180">
                  <defs>
                    <linearGradient id="arrowGrad" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F0A75B"/>
                      <stop offset="100%" stopColor="#E5651C"/>
                    </linearGradient>
                  </defs>
                  {/* purple ring */}
                  <circle cx="100" cy="100" r="82" fill="none" stroke="#5E3F97" strokeWidth="8"/>
                  {/* upward arrow line graph */}
                  <path d="M40 145 L80 115 L110 135 L165 65" fill="none" stroke="url(#arrowGrad)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* arrow head */}
                  <path d="M165 65 L138 60 L155 90 Z" fill="#E5651C"/>
                  {/* rupee symbol */}
                  <text x="112" y="70" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="46" fill="#5E3F97">₹</text>
                </svg>
              </div>
              <h1 className="budget-title">
                <span className="bt-blue">BUDGET</span>
                <span className="bt-orange"> MITRA</span>
              </h1>
              <div className="hindi-divider" />
              <div className="hindi-title">
                <span className="hindi-blue">बजट</span>
                <span className="hindi-orange"> मित्र</span>
              </div>
              <p className="sys-line">SERPL Revenue Budget<br/>Preparation &amp; Approval System</p>
              <div className="serpl-row">
                <span className="serpl-line purple" />
                <span className="serpl-text">SERPL</span>
                <span className="serpl-line orange" />
              </div>
            </div>

            <div className="message-card" data-testid="leadership-message">
              <div className="portrait" aria-label="Leadership avatar">
                <User size={36} strokeWidth={2} color="#ffffff" />
              </div>
              <div className="msg-body">
                <h2>Message from ED &amp; RH, SERPL</h2>
                <div className="msg-rule" />
                <p>At SERPL, we are committed to transparent, efficient and value-driven budgeting to build a stronger tomorrow.</p>
                <p>Let's plan responsibly and progress together.</p>
                <strong>— ED &amp; RH, SERPL</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Right panel */}
        <section className="form-panel" data-testid="authentication-panel">
          <div className="login-card">
            <h2 className="welcome-heading" data-testid="welcome-heading">
              <span className="wh-blue">Welcome</span> <span className="wh-orange">Back!</span>
            </h2>
            <div className="welcome-rule" />
            <p className="welcome-sub" data-testid="login-subtitle">Sign in to continue to your dashboard</p>

            <form onSubmit={handleSubmit} noValidate data-testid="login-form">
              <label className="field-wrap" data-testid="employee-field">
                <User size={22} strokeWidth={1.8} className="field-icon" />
                <input
                  aria-label="Employee number"
                  data-testid="employee-number-input"
                  value={employeeNo}
                  onChange={(e) => setEmployeeNo(e.target.value)}
                  placeholder="Employee No."
                  autoComplete="username"
                />
              </label>

              <label className="field-wrap" data-testid="password-field">
                <Lock size={22} strokeWidth={1.8} className="field-icon" />
                <input
                  aria-label="Password"
                  data-testid="password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-testid="password-visibility-button"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </label>

              <div className="form-row">
                <label className="remember-control" data-testid="remember-me-control">
                  <input
                    type="checkbox"
                    data-testid="remember-me-checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="fake-box" />
                  <span className="remember-text">Remember me</span>
                </label>
                <button
                  type="button"
                  className="forgot-link"
                  data-testid="forgot-password-button"
                  onClick={() => setForgotOpen(true)}
                >
                  Forgot Password?
                </button>
              </div>

              <button type="submit" className="login-btn" data-testid="login-submit-button">
                <span>LOGIN</span>
                <ArrowRight size={22} strokeWidth={2.2} />
              </button>

              {message && (
                <div
                  className={`form-message ${message.type}`}
                  role="status"
                  data-testid="login-status-message"
                >
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      {forgotOpen && (
        <div className="modal-backdrop" data-testid="forgot-password-modal" onClick={() => setForgotOpen(false)}>
          <div className="forgot-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              data-testid="forgot-modal-close"
              aria-label="Close forgot password dialog"
              onClick={() => setForgotOpen(false)}
            >
              <X size={20} />
            </button>
            <h2>Need a reset?</h2>
            <p>Please contact your SERPL administrator to reset your portal password.</p>
            <button className="modal-action" data-testid="forgot-modal-dismiss" onClick={() => setForgotOpen(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
