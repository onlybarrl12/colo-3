import base64, os, sys

ROOT = '/app/frontend/public/logos'

def b64(name):
    p = os.path.join(ROOT, name)
    with open(p, 'rb') as f:
        return base64.b64encode(f.read()).decode()

def datauri(name, mime):
    return f'data:{mime};base64,{b64(name)}'

D = {
    'IOL':    datauri('indianoil.png', 'image/png'),
    'SPRINT': datauri('sprint.png',    'image/png'),
    'EMBLEM': datauri('emblem.png',    'image/png'),
    'TANK':   datauri('tank-farm.jpg', 'image/jpeg'),
    'ED':     datauri('ed-photo.jpg',  'image/jpeg'),
}

TEMPLATE = r'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Budget Mitra · SERPL · Sign In</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@500;700;800&display=swap" rel="stylesheet">
<style>
:root{
  --iol-blue:#1F3C88;--iol-blue-deep:#152A66;
  --brand-orange:#E97F3A;--brand-orange-deep:#D65E1E;
  --brand-purple:#6C46A5;--brand-purple-deep:#4E2E86;
  --ink:#233248;--muted:#6A7691;--field-border:#D9DEE7;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0;min-height:100%}
body{
  font-family:'Manrope','Sora',system-ui,sans-serif;
  color:var(--ink);background:#fff;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
}
.page-root{min-height:100vh;display:flex;flex-direction:column;background:#fff}
.hidden{display:none !important}

/* ============ Top header ============ */
.top-header{
  height:96px;background:#fff;border-bottom:1px solid #eef0f2;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 clamp(20px,3vw,44px);position:relative;z-index:3;
}
.header-left,.header-right{display:flex;align-items:center}
.brand-img{display:block;width:auto;user-select:none}
.brand-img-iol{height:72px}
.brand-img-sprint{height:76px}

/* ============ Main shell ============ */
.login-shell{
  flex:1;display:grid;
  grid-template-columns:minmax(0,1.05fr) minmax(460px,.95fr);
  position:relative;isolation:isolate;
  background-color:#5E3F97;background-position:center 45%;
  background-size:cover;background-repeat:no-repeat;
  background-image:
    linear-gradient(120deg,rgba(94,63,151,.72) 0%,rgba(120,72,158,.55) 30%,rgba(196,105,90,.5) 60%,rgba(233,127,58,.6) 100%),
    url('__TANK__');
}

/* ============ Brand panel ============ */
.brand-panel{padding:clamp(20px,3vw,44px) clamp(30px,6vw,90px) clamp(22px,3vw,38px);display:flex;align-items:center;justify-content:center}
.brand-inner{width:100%;max-width:620px;display:flex;flex-direction:column;gap:clamp(20px,2.5vw,32px)}
.budget-brand{text-align:center;color:#fff;position:relative}
.rupee-badge{
  display:flex;justify-content:center;position:relative;margin-bottom:8px;
  filter:drop-shadow(0 14px 28px rgba(94,53,20,.35)) drop-shadow(0 4px 8px rgba(233,127,58,.35));
  animation:float-emblem 4.6s ease-in-out infinite;
}
.rupee-emblem{width:clamp(120px,12vw,170px);height:auto;display:block;transition:transform .5s ease}
.rupee-badge:hover .rupee-emblem{transform:scale(1.05) rotate(-3deg)}
.rupee-badge::before{
  content:"";position:absolute;width:60%;height:60%;
  background:radial-gradient(circle,rgba(255,200,120,.45) 0%,transparent 70%);
  filter:blur(24px);z-index:-1;animation:pulse-glow 3.4s ease-in-out infinite;
}
@keyframes float-emblem{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(-2deg)}}
@keyframes pulse-glow{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
@keyframes card-rise{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

.budget-title{
  margin:0;font-family:'Sora',sans-serif;font-weight:800;
  font-size:clamp(44px,5.5vw,68px);letter-spacing:-2.4px;line-height:1;
  text-shadow:0 2px 14px rgba(0,0,0,.08);
}
.bt-blue{color:var(--iol-blue)}
.bt-orange{color:var(--brand-orange)}
.hindi-divider{width:70%;max-width:420px;height:2px;background:var(--brand-orange);margin:12px auto 10px;opacity:.85}
.hindi-title{font-family:'Noto Sans Devanagari','Sora',sans-serif;font-weight:800;font-size:clamp(32px,3.6vw,44px);letter-spacing:1px;line-height:1.1}
.hindi-blue{color:var(--iol-blue)}
.hindi-orange{color:var(--brand-orange)}
.sys-line{margin:14px 0 12px;color:var(--iol-blue);font-family:'Sora',sans-serif;font-weight:600;font-size:clamp(16px,1.7vw,21px);line-height:1.3}
.serpl-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:8px}
.serpl-line{display:block;height:2px;width:80px;border-radius:2px}
.serpl-line.purple{background:var(--brand-purple)}
.serpl-line.orange{background:var(--brand-orange)}
.serpl-text{font-family:'Sora',sans-serif;font-weight:800;font-size:22px;color:var(--iol-blue);letter-spacing:2px}

/* ============ Message card ============ */
.message-card{
  align-self:flex-start;display:flex;gap:20px;
  width:min(100%,560px);padding:18px 22px;border-radius:20px;
  background:rgba(255,255,255,.97);
  box-shadow:0 22px 44px rgba(31,20,60,.28),0 2px 6px rgba(31,20,60,.08);
  backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.6);
  animation:card-rise .7s .15s ease-out both;
}
.portrait-wrap{position:relative;flex:0 0 78px;align-self:flex-start}
.portrait{
  width:78px;height:78px;border-radius:50%;overflow:hidden;
  background:linear-gradient(135deg,#6C46A5,#4E2E86);
  display:grid;place-items:center;
  box-shadow:0 8px 18px rgba(94,63,151,.4),0 0 0 3px #fff,0 0 0 4px rgba(108,70,165,.35);
}
.portrait-img{width:100%;height:100%;object-fit:cover;display:block}
.portrait-edit{
  position:absolute;bottom:-2px;right:-2px;
  width:26px;height:26px;border-radius:50%;padding:0;
  background:linear-gradient(135deg,#E97F3A,#D65E1E);
  border:2px solid #fff;color:#fff;cursor:pointer;
  display:grid;place-items:center;
  box-shadow:0 4px 10px rgba(214,94,30,.4);transition:transform .2s;
}
.portrait-edit:hover{transform:scale(1.12)}
.msg-body{flex:1;min-width:0}
.msg-body h2{margin:0;color:var(--iol-blue);font-family:'Sora',sans-serif;font-size:16.5px;font-weight:700;line-height:1.3;letter-spacing:-.2px}
.msg-rule{height:3px;width:52px;background:linear-gradient(90deg,var(--brand-purple),var(--brand-orange));margin:8px 0 10px;border-radius:3px}
.msg-body p{margin:0 0 6px;color:#3a4759;font-family:'Manrope',sans-serif;font-size:13.5px;line-height:1.55;font-weight:500}
.msg-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px}
.msg-body strong{color:var(--brand-purple);font-family:'Sora',sans-serif;font-weight:700;font-size:13.5px;letter-spacing:.3px}
.reset-photo{border:0;background:transparent;cursor:pointer;color:var(--brand-orange);font-family:'Manrope',sans-serif;font-size:12px;font-weight:600;padding:0}
.reset-photo:hover{text-decoration:underline}

/* ============ Form panel ============ */
.form-panel{padding:clamp(30px,4vw,60px) clamp(24px,5vw,70px);display:flex;align-items:center;justify-content:center}
.login-card{width:100%;max-width:520px;background:#fff;border-radius:22px;padding:clamp(30px,4vw,56px) clamp(28px,4vw,54px);box-shadow:0 30px 60px rgba(31,20,60,.22),0 8px 20px rgba(31,20,60,.08)}
.welcome-heading{margin:0;font-family:'Sora',sans-serif;font-weight:800;font-size:clamp(32px,3.4vw,42px);line-height:1.1;letter-spacing:-.6px}
.wh-blue{color:var(--iol-blue)}
.wh-orange{color:var(--brand-orange)}
.welcome-rule{height:3px;width:74px;background:var(--brand-orange);border-radius:3px;margin:14px 0 18px}
.welcome-sub{margin:0 0 34px;color:var(--muted);font-family:'Manrope',sans-serif;font-size:15px;font-weight:500}
.field-wrap{display:flex;align-items:center;gap:14px;height:60px;padding:0 18px;border:1.5px solid var(--field-border);border-radius:14px;background:#fff;margin-bottom:16px;transition:border-color .2s,box-shadow .2s}
.field-wrap:focus-within{border-color:var(--brand-orange);box-shadow:0 0 0 4px rgba(233,127,58,.12)}
.field-icon{color:#8b94a8;flex-shrink:0}
.field-wrap input{flex:1;min-width:0;border:0;outline:0;background:transparent;font-family:'Manrope',sans-serif;font-size:15px;color:var(--ink);font-weight:500}
.field-wrap input::placeholder{color:#9aa3b6;font-weight:400}
.eye-button{border:0;background:transparent;cursor:pointer;color:#8b94a8;display:grid;place-items:center;padding:2px;transition:color .2s}
.eye-button:hover{color:var(--brand-orange)}
.form-row{display:flex;align-items:center;justify-content:space-between;margin:18px 0 28px}
.remember-control{display:inline-flex;align-items:center;gap:10px;cursor:pointer;position:relative;font-family:'Manrope',sans-serif;font-size:14px;color:var(--ink);font-weight:500}
.remember-control input{position:absolute;opacity:0;pointer-events:none}
.fake-box{width:20px;height:20px;border:1.5px solid #b7bfd0;border-radius:5px;background:#fff;display:inline-block;position:relative;transition:all .18s}
.remember-control input:checked+.fake-box{background:var(--brand-orange);border-color:var(--brand-orange)}
.remember-control input:checked+.fake-box::after{content:"";position:absolute;left:5px;top:1px;width:6px;height:11px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
.forgot-link{border:0;background:transparent;cursor:pointer;color:var(--brand-orange);font-family:'Manrope',sans-serif;font-weight:600;font-size:14px;padding:0}
.forgot-link:hover{text-decoration:underline}
.login-btn{
  width:100%;height:60px;border:0;border-radius:14px;color:#fff;cursor:pointer;
  background:linear-gradient(90deg,#6C46A5 0%,#9E5A88 40%,#E97F3A 100%);
  display:flex;align-items:center;justify-content:center;gap:14px;
  font-family:'Sora',sans-serif;font-weight:700;font-size:17px;letter-spacing:1.2px;
  box-shadow:0 12px 24px rgba(108,70,165,.32);transition:transform .2s,box-shadow .2s;
}
.login-btn:hover{transform:translateY(-2px);box-shadow:0 16px 32px rgba(108,70,165,.4)}
.form-message{margin-top:18px;padding:12px 14px;border-radius:10px;font-family:'Manrope',sans-serif;font-size:13.5px;font-weight:600}
.form-message.error{background:#fdecec;color:#b0341c}
.form-message.success{background:#e8f7ee;color:#136b3a}

/* ============ Modal ============ */
.modal-backdrop{position:fixed;inset:0;z-index:20;background:rgba(23,18,44,.55);display:grid;place-items:center;padding:20px;backdrop-filter:blur(3px)}
.forgot-modal{width:min(100%,400px);background:#fff;border-radius:18px;padding:34px;position:relative;box-shadow:0 30px 70px rgba(0,0,0,.28)}
.forgot-modal h2{margin:0 0 8px;color:var(--iol-blue);font-family:'Sora',sans-serif;font-weight:800;font-size:24px}
.forgot-modal p{margin:0 0 22px;color:var(--muted);font-family:'Manrope',sans-serif;font-size:14px;line-height:1.55}
.modal-close{position:absolute;top:14px;right:14px;border:0;background:transparent;color:#7c8598;cursor:pointer;padding:4px}
.modal-action{border:0;border-radius:10px;padding:10px 20px;color:#fff;cursor:pointer;background:linear-gradient(90deg,var(--brand-purple),var(--brand-orange));font-family:'Sora',sans-serif;font-weight:700;font-size:14px}

/* ============ Responsive ============ */
@media (max-width:1024px){.login-shell{grid-template-columns:1fr}.brand-panel{padding:24px 20px 12px}.form-panel{padding:20px 20px 40px}.message-card{margin:0 auto}}
@media (max-width:720px){.top-header{height:auto;flex-direction:column;gap:12px;padding:14px 16px}.brand-img-iol{height:46px}.brand-img-sprint{height:48px}.budget-title{font-size:38px}.hindi-title{font-size:28px}.sys-line{font-size:16px}.welcome-heading{font-size:30px}.login-card{padding:28px 22px}.field-wrap{height:54px}.login-btn{height:54px;font-size:15px}}

@media (prefers-reduced-motion: reduce){
  .rupee-badge,.rupee-badge::before,.message-card{animation:none !important}
}
</style>
</head>
<body>
<div class="page-root">
  <!-- Top Header -->
  <header class="top-header">
    <div class="header-left">
      <img src="__IOL__" alt="IndianOil — The Energy Of India" class="brand-img brand-img-iol" />
    </div>
    <div class="header-right">
      <img src="__SPRINT__" alt="SPRINT — A Transformational Project" class="brand-img brand-img-sprint" />
    </div>
  </header>

  <!-- Main login shell -->
  <main class="login-shell">
    <!-- Left brand panel -->
    <section class="brand-panel">
      <div class="brand-inner">
        <div class="budget-brand">
          <div class="rupee-badge">
            <img src="__EMBLEM__" alt="Budget Mitra emblem" class="rupee-emblem" />
          </div>
          <h1 class="budget-title"><span class="bt-blue">BUDGET</span><span class="bt-orange"> MITRA</span></h1>
          <div class="hindi-divider"></div>
          <div class="hindi-title"><span class="hindi-blue">बजट</span><span class="hindi-orange"> मित्र</span></div>
          <p class="sys-line">SERPL Revenue Budget<br/>Preparation &amp; Approval System</p>
          <div class="serpl-row">
            <span class="serpl-line purple"></span>
            <span class="serpl-text">SERPL</span>
            <span class="serpl-line orange"></span>
          </div>
        </div>

        <div class="message-card">
          <div class="portrait-wrap">
            <div class="portrait">
              <img id="edPortrait" src="__ED__" alt="ED & RH, SERPL" class="portrait-img"/>
            </div>
            <button type="button" class="portrait-edit" id="openPhotoInput" title="Change photo" aria-label="Change ED & RH photo">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </button>
            <input type="file" id="edPhotoInput" accept="image/*" style="display:none"/>
          </div>
          <div class="msg-body">
            <h2>Message from ED &amp; RH, SERPL</h2>
            <div class="msg-rule"></div>
            <p>At SERPL, we are committed to transparent, efficient and value-driven budgeting to build a stronger tomorrow.</p>
            <p>Let's plan responsibly and progress together.</p>
            <div class="msg-footer">
              <strong>— ED &amp; RH, SERPL</strong>
              <button type="button" class="reset-photo hidden" id="resetPhoto">Reset photo</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Right form panel -->
    <section class="form-panel">
      <div class="login-card">
        <h2 class="welcome-heading"><span class="wh-blue">Welcome</span> <span class="wh-orange">Back!</span></h2>
        <div class="welcome-rule"></div>
        <p class="welcome-sub">Sign in to continue to your dashboard</p>

        <form id="loginForm" novalidate>
          <label class="field-wrap">
            <svg class="field-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
            <input id="employeeNo" placeholder="Employee No." autocomplete="username" aria-label="Employee number"/>
          </label>
          <label class="field-wrap">
            <svg class="field-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input id="password" type="password" placeholder="Password" autocomplete="current-password" aria-label="Password"/>
            <button type="button" class="eye-button" id="togglePw" aria-label="Show password">
              <svg id="eyeOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg id="eyeClosed" class="hidden" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a19.6 19.6 0 0 1 5.06-5.94"/><path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a19.7 19.7 0 0 1-3.17 4.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </label>

          <div class="form-row">
            <label class="remember-control">
              <input type="checkbox" id="remember"/>
              <span class="fake-box"></span>
              <span>Remember me</span>
            </label>
            <button type="button" class="forgot-link" id="openForgot">Forgot Password?</button>
          </div>

          <button type="submit" class="login-btn">
            <span>LOGIN</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>

          <div id="message" class="form-message hidden" role="status"></div>
        </form>
      </div>
    </section>
  </main>

  <!-- Forgot password modal -->
  <div id="forgotModal" class="modal-backdrop hidden">
    <div class="forgot-modal" role="dialog" aria-modal="true">
      <button class="modal-close" id="closeForgot" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <h2>Need a reset?</h2>
      <p>Please contact your SERPL administrator to reset your portal password.</p>
      <button class="modal-action" id="dismissForgot">Got it</button>
    </div>
  </div>
</div>

<script>
(function(){
  var DEMO_EMPLOYEE="BM-2024-001", DEMO_PASSWORD="budgetmitra";
  var DEFAULT_ED = document.getElementById('edPortrait').src;

  var els = {
    employeeNo: document.getElementById('employeeNo'),
    password:   document.getElementById('password'),
    togglePw:   document.getElementById('togglePw'),
    eyeOpen:    document.getElementById('eyeOpen'),
    eyeClosed:  document.getElementById('eyeClosed'),
    form:       document.getElementById('loginForm'),
    message:    document.getElementById('message'),
    openForgot: document.getElementById('openForgot'),
    closeForgot:document.getElementById('closeForgot'),
    dismiss:    document.getElementById('dismissForgot'),
    modal:      document.getElementById('forgotModal'),
    portrait:   document.getElementById('edPortrait'),
    editBtn:    document.getElementById('openPhotoInput'),
    fileInput:  document.getElementById('edPhotoInput'),
    resetBtn:   document.getElementById('resetPhoto'),
  };

  // Restore custom photo if user picked one previously
  try {
    var stored = localStorage.getItem('bm_ed_photo');
    if (stored) { els.portrait.src = stored; els.resetBtn.classList.remove('hidden'); }
  } catch(_){}

  function setMsg(text, ok){
    if(!text){els.message.classList.add('hidden');els.message.textContent='';return;}
    els.message.classList.remove('hidden','success','error');
    els.message.classList.add(ok?'success':'error');
    els.message.textContent = text;
  }

  els.togglePw.addEventListener('click', function(){
    var vis = els.password.type === 'text';
    els.password.type = vis ? 'password' : 'text';
    els.togglePw.setAttribute('aria-label', vis ? 'Show password' : 'Hide password');
    els.eyeOpen.classList.toggle('hidden', !vis);
    els.eyeClosed.classList.toggle('hidden', vis);
  });

  els.form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!els.employeeNo.value.trim() || !els.password.value.trim()){
      setMsg('Please enter your employee number and password.', false); return;
    }
    if(els.employeeNo.value === DEMO_EMPLOYEE && els.password.value === DEMO_PASSWORD){
      setMsg('Welcome to your Budget Mitra dashboard.', true); return;
    }
    setMsg('Invalid credentials. Try BM-2024-001 / budgetmitra.', false);
  });

  els.openForgot.addEventListener('click', function(){ els.modal.classList.remove('hidden'); });
  els.closeForgot.addEventListener('click', function(){ els.modal.classList.add('hidden'); });
  els.dismiss.addEventListener('click', function(){ els.modal.classList.add('hidden'); });
  els.modal.addEventListener('click', function(e){ if(e.target === els.modal) els.modal.classList.add('hidden'); });

  // ED photo change flow
  els.editBtn.addEventListener('click', function(){ els.fileInput.click(); });
  els.fileInput.addEventListener('change', function(e){
    var file = e.target.files && e.target.files[0];
    if(!file) return;
    var reader = new FileReader();
    reader.onload = function(ev){
      var dataUrl = ev.target.result;
      els.portrait.src = dataUrl;
      els.resetBtn.classList.remove('hidden');
      try { localStorage.setItem('bm_ed_photo', dataUrl); } catch(_){}
    };
    reader.readAsDataURL(file);
  });
  els.resetBtn.addEventListener('click', function(){
    els.portrait.src = DEFAULT_ED;
    els.resetBtn.classList.add('hidden');
    try { localStorage.removeItem('bm_ed_photo'); } catch(_){}
    els.fileInput.value = '';
  });
})();
</script>
</body>
</html>
'''

out = TEMPLATE
for k,v in D.items():
    out = out.replace(f'__{k}__', v)

with open('/app/standalone_login.html', 'w') as f:
    f.write(out)

size = os.path.getsize('/app/standalone_login.html')
print(f'Wrote /app/standalone_login.html: {size/1024:.1f} KB')
