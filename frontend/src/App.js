import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, UserRound, ArrowRight, CheckCircle2, X } from "lucide-react";
import "@/App.css";

const DEMO_EMPLOYEE = "BM-2024-001";
const DEMO_PASSWORD = "budgetmitra";

function App() {
  const [employeeNo, setEmployeeNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  const fillDemo = () => {
    setEmployeeNo(DEMO_EMPLOYEE);
    setPassword(DEMO_PASSWORD);
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!employeeNo.trim() || !password.trim()) {
      setMessage("Please enter your employee number and password.");
      return;
    }
    if (employeeNo !== DEMO_EMPLOYEE || password !== DEMO_PASSWORD) {
      setMessage("For this demo, use the quick demo credentials below.");
      return;
    }
    setMessage("Welcome to your Budget Mitra dashboard.");
  };

  return (
    <main className="login-shell" data-testid="login-page">
      <section className="brand-panel" data-testid="brand-panel">
        <div className="brand-content">
          <div className="sprint-mark" data-testid="sprint-brand">
            <span className="sprint-runner">➤</span><span>SPRINT</span><small>MISSION EXCELLENCE</small>
          </div>
          <div className="budget-brand" data-testid="budget-mitra-brand">
            <div className="rupee-emblem">₹</div>
            <h1><span>BUDGET</span> <b>MITRA</b></h1>
            <div className="hindi-line"><i /> बजट मित्र <i /></div>
            <p>SERPL Revenue Budget<br />Preparation &amp; Approval System</p>
            <strong><em /> SERPL <em /></strong>
          </div>
        </div>
        <div className="message-card" data-testid="leadership-message">
          <div className="portrait" aria-label="Leadership portrait">SR</div>
          <div>
            <h2>Message from ED &amp; RH, SERPL</h2>
            <p>At SERPL, we are committed to transparent, efficient and value-driven budgeting to build a stronger tomorrow. Let’s plan responsibly and progress together.</p>
            <strong>— ED &amp; RH, SERPL</strong>
          </div>
        </div>
        <div className="plant-caption" data-testid="plant-caption">Powering responsible growth through disciplined planning</div>
      </section>

      <section className="form-panel" data-testid="authentication-panel">
        <div className="login-card">
          <div className="card-heading">
            <h2 data-testid="welcome-heading">Welcome <span>Back!</span></h2>
            <div className="heading-rule" />
            <p data-testid="login-subtitle">Sign in to continue to your dashboard</p>
          </div>
          <form onSubmit={handleSubmit} noValidate data-testid="login-form">
            <label className="field-wrap" data-testid="employee-field">
              <UserRound size={25} strokeWidth={1.8} aria-hidden="true" />
              <input aria-label="Employee number" data-testid="employee-number-input" value={employeeNo} onChange={(e) => setEmployeeNo(e.target.value)} placeholder="Employee No." autoComplete="username" />
            </label>
            <label className="field-wrap" data-testid="password-field">
              <LockKeyhole size={25} strokeWidth={1.8} aria-hidden="true" />
              <input aria-label="Password" data-testid="password-input" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" />
              <button type="button" className="icon-button" aria-label={showPassword ? "Hide password" : "Show password"} data-testid="password-visibility-button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={25} /> : <Eye size={25} />}</button>
            </label>
            <div className="form-options">
              <label className="remember-control" data-testid="remember-me-control">
                <input type="checkbox" data-testid="remember-me-checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span className="fake-checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="forgot-link" data-testid="forgot-password-button" onClick={() => setForgotOpen(true)}>Forgot Password?</button>
            </div>
            <button type="submit" className="login-button" data-testid="login-submit-button">LOGIN <ArrowRight size={25} strokeWidth={1.7} /></button>
            <button type="button" className="demo-link" data-testid="demo-credentials-button" onClick={fillDemo}>Use demo credentials</button>
            {message && <div className={`form-message ${message.startsWith("Welcome") ? "success" : "error"}`} role="status" data-testid="login-status-message">{message.startsWith("Welcome") && <CheckCircle2 size={17} />} {message}</div>}
          </form>
        </div>
        <footer data-testid="portal-footer">© 2025 SERPL · Budget Mitra Portal</footer>
      </section>

      {forgotOpen && <div className="modal-backdrop" data-testid="forgot-password-modal">
        <div className="forgot-modal" role="dialog" aria-modal="true" aria-labelledby="forgot-title">
          <button className="modal-close" data-testid="forgot-modal-close" aria-label="Close forgot password dialog" onClick={() => setForgotOpen(false)}><X size={20} /></button>
          <h2 id="forgot-title">Need a reset?</h2>
          <p>Please contact your SERPL administrator to reset your portal password.</p>
          <button className="modal-action" data-testid="forgot-modal-dismiss" onClick={() => setForgotOpen(false)}>Got it</button>
        </div>
      </div>}
    </main>
  );
}

export default App;