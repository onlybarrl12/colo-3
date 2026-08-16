import { useState } from "react";
import { Eye, EyeOff, Lock, User, ArrowRight, X } from "lucide-react";
import Dashboard from "@/Dashboard";
import "@/App.css";

const DEMO_EMPLOYEE = "BM-2024-001";
const DEMO_PASSWORD = "budgetmitra";

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
          <img
            src="/logos/indianoil.png"
            alt="IndianOil — The Energy Of India"
            className="brand-img brand-img-iol"
          />
        </div>
        <div className="header-right">
          <img
            src="/logos/sprint.png"
            alt="SPRINT — A Transformational Project"
            className="brand-img brand-img-sprint"
          />
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
