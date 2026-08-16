import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Lock, User, ArrowRight, X, Camera, Pencil, Check } from "lucide-react";
import Dashboard from "@/Dashboard";
import "@/App.css";

const DEMO_EMPLOYEE = "BM-2024-001";
const DEMO_PASSWORD = "budgetmitra";
const DEFAULT_ED_PHOTO = "/logos/ed-photo.jpg";
const DEFAULT_MSG = {
  heading: "Message from ED & RH, SERPL",
  body1:
    "At SERPL, we are committed to transparent, efficient and value-driven budgeting to build a stronger tomorrow.",
  body2: "Let's plan responsibly and progress together.",
  signature: "— ED & RH, SERPL",
};

function App() {
  const [employeeNo, setEmployeeNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState(null);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [edPhoto, setEdPhoto] = useState(DEFAULT_ED_PHOTO);
  const [edMsg, setEdMsg] = useState(DEFAULT_MSG);
  const [editingMsg, setEditingMsg] = useState(false);
  const [draftMsg, setDraftMsg] = useState(DEFAULT_MSG);
  const fileInputRef = useRef(null);

  // Persist chosen ED photo & message across reloads
  useEffect(() => {
    const storedPhoto = localStorage.getItem("bm_ed_photo");
    if (storedPhoto) setEdPhoto(storedPhoto);
    const storedMsg = localStorage.getItem("bm_ed_msg");
    if (storedMsg) {
      try {
        const parsed = JSON.parse(storedMsg);
        setEdMsg({ ...DEFAULT_MSG, ...parsed });
      } catch (_) {}
    }
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setEdPhoto(dataUrl);
      try { localStorage.setItem("bm_ed_photo", dataUrl); } catch (_) {}
    };
    reader.readAsDataURL(file);
  };

  const resetPhoto = () => {
    setEdPhoto(DEFAULT_ED_PHOTO);
    localStorage.removeItem("bm_ed_photo");
  };

  const startEditMsg = () => {
    setDraftMsg(edMsg);
    setEditingMsg(true);
  };
  const cancelEditMsg = () => {
    setEditingMsg(false);
    setDraftMsg(edMsg);
  };
  const saveEditMsg = () => {
    const cleaned = {
      heading: (draftMsg.heading || DEFAULT_MSG.heading).trim(),
      body1: (draftMsg.body1 || "").trim(),
      body2: (draftMsg.body2 || "").trim(),
      signature: (draftMsg.signature || DEFAULT_MSG.signature).trim(),
    };
    setEdMsg(cleaned);
    setEditingMsg(false);
    try { localStorage.setItem("bm_ed_msg", JSON.stringify(cleaned)); } catch (_) {}
  };
  const resetMsg = () => {
    setEdMsg(DEFAULT_MSG);
    setDraftMsg(DEFAULT_MSG);
    localStorage.removeItem("bm_ed_msg");
  };
  const msgIsCustom =
    edMsg.heading !== DEFAULT_MSG.heading ||
    edMsg.body1 !== DEFAULT_MSG.body1 ||
    edMsg.body2 !== DEFAULT_MSG.body2 ||
    edMsg.signature !== DEFAULT_MSG.signature;

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

      <main
        className="login-shell"
      >
        {/* Decorative theme background */}
        <div className="bg-scene" aria-hidden="true">
          <div className="bg-grid" />
          <div className="bg-blob bg-blob-1" />
          <div className="bg-blob bg-blob-2" />
          <div className="bg-blob bg-blob-3" />
          <div className="bg-glow" />
          <div className="bg-lines">
            <span /><span /><span /><span /><span /><span />
          </div>
        </div>
        {/* Left panel */}
        <section className="brand-panel" data-testid="brand-panel">
          <div className="brand-inner">
            <div className="budget-brand" data-testid="budget-mitra-brand">
              <div className="rupee-badge" aria-hidden="true">
                <img
                  src="/logos/emblem.png"
                  alt="Budget Mitra emblem"
                  className="rupee-emblem"
                />
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
              <div className="portrait-wrap">
                <div className="portrait" aria-label="ED & RH portrait">
                  <img
                    src={edPhoto}
                    alt="ED & RH, SERPL"
                    className="portrait-img"
                    data-testid="ed-portrait"
                  />
                </div>
                <button
                  type="button"
                  className="portrait-edit"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  aria-label="Change ED & RH photo"
                  data-testid="change-ed-photo-button"
                  title="Change photo"
                >
                  <Camera size={13} strokeWidth={2.2} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                  data-testid="ed-photo-input"
                />
              </div>
              <div className="msg-body">
                {!editingMsg ? (
                  <>
                    <div className="msg-head-row">
                      <h2 data-testid="ed-heading">{edMsg.heading}</h2>
                      <button
                        type="button"
                        className="msg-edit-btn"
                        onClick={startEditMsg}
                        aria-label="Edit message"
                        data-testid="edit-ed-message-button"
                        title="Edit message"
                      >
                        <Pencil size={13} strokeWidth={2.2} />
                      </button>
                    </div>
                    <div className="msg-rule" />
                    {edMsg.body1 && <p data-testid="ed-body1">{edMsg.body1}</p>}
                    {edMsg.body2 && <p data-testid="ed-body2">{edMsg.body2}</p>}
                    <div className="msg-footer">
                      <strong data-testid="ed-signature">{edMsg.signature}</strong>
                      <div className="msg-footer-actions">
                        {msgIsCustom && (
                          <button
                            type="button"
                            className="reset-photo"
                            onClick={resetMsg}
                            data-testid="reset-ed-message-button"
                          >
                            Reset text
                          </button>
                        )}
                        {edPhoto !== DEFAULT_ED_PHOTO && (
                          <button
                            type="button"
                            className="reset-photo"
                            onClick={resetPhoto}
                            data-testid="reset-ed-photo-button"
                          >
                            Reset photo
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="msg-edit-form" data-testid="ed-message-editor">
                    <input
                      className="msg-edit-input msg-edit-heading"
                      value={draftMsg.heading}
                      onChange={(e) => setDraftMsg({ ...draftMsg, heading: e.target.value })}
                      placeholder="Heading"
                      data-testid="edit-heading-input"
                      maxLength={80}
                    />
                    <div className="msg-rule" />
                    <textarea
                      className="msg-edit-input"
                      value={draftMsg.body1}
                      onChange={(e) => setDraftMsg({ ...draftMsg, body1: e.target.value })}
                      placeholder="First paragraph"
                      rows={2}
                      data-testid="edit-body1-input"
                      maxLength={280}
                    />
                    <textarea
                      className="msg-edit-input"
                      value={draftMsg.body2}
                      onChange={(e) => setDraftMsg({ ...draftMsg, body2: e.target.value })}
                      placeholder="Second paragraph (optional)"
                      rows={2}
                      data-testid="edit-body2-input"
                      maxLength={280}
                    />
                    <input
                      className="msg-edit-input msg-edit-signature"
                      value={draftMsg.signature}
                      onChange={(e) => setDraftMsg({ ...draftMsg, signature: e.target.value })}
                      placeholder="Signature"
                      data-testid="edit-signature-input"
                      maxLength={60}
                    />
                    <div className="msg-edit-actions">
                      <button
                        type="button"
                        className="msg-cancel-btn"
                        onClick={cancelEditMsg}
                        data-testid="cancel-edit-message-button"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="msg-save-btn"
                        onClick={saveEditMsg}
                        data-testid="save-edit-message-button"
                      >
                        <Check size={14} strokeWidth={2.5} /> Save
                      </button>
                    </div>
                  </div>
                )}
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
