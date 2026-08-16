import { useState } from "react";
import {
  LayoutDashboard, FileSpreadsheet, CheckCircle2, ClockAlert, XCircle,
  BarChart3, Users, Settings, Bell, Search, LogOut, TrendingUp,
  ArrowUpRight, ArrowDownRight, Filter, Download, Plus, ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  CartesianGrid, BarChart, Bar, Legend,
} from "recharts";
import "@/Dashboard.css";

const KPIS = [
  { key: "total",    label: "Total Budget",     value: "₹1,842 Cr", delta: "+12.4%", trend: "up",   icon: FileSpreadsheet, tone: "blue"   },
  { key: "approved", label: "Approved",         value: "₹1,204 Cr", delta: "+8.1%",  trend: "up",   icon: CheckCircle2,    tone: "green"  },
  { key: "pending",  label: "Pending Review",   value: "₹482 Cr",   delta: "-3.2%",  trend: "down", icon: ClockAlert,      tone: "orange" },
  { key: "rejected", label: "Rejected / Held",  value: "₹156 Cr",   delta: "+1.8%",  trend: "up",   icon: XCircle,         tone: "red"    },
];

const AREA_DATA = [
  { m: "Apr", planned: 120, actual: 108 },
  { m: "May", planned: 150, actual: 142 },
  { m: "Jun", planned: 175, actual: 168 },
  { m: "Jul", planned: 190, actual: 205 },
  { m: "Aug", planned: 210, actual: 198 },
  { m: "Sep", planned: 235, actual: 244 },
  { m: "Oct", planned: 258, actual: 262 },
  { m: "Nov", planned: 275, actual: 268 },
  { m: "Dec", planned: 290, actual: 298 },
];

const BAR_DATA = [
  { dept: "Refining",    approved: 420, pending: 90  },
  { dept: "Marketing",   approved: 310, pending: 120 },
  { dept: "Pipelines",   approved: 268, pending: 74  },
  { dept: "R&D",         approved: 92,  pending: 48  },
  { dept: "HR & Admin",  approved: 114, pending: 62  },
  { dept: "IT & Digital", approved: 88, pending: 88  },
];

const APPROVALS = [
  { id: "BR-2411-041", dept: "Refining",     amount: "₹48.20 Cr", owner: "R. Menon",    status: "Approved" },
  { id: "BR-2411-042", dept: "Pipelines",    amount: "₹22.75 Cr", owner: "S. Iyer",     status: "Pending"  },
  { id: "BR-2411-043", dept: "Marketing",    amount: "₹36.10 Cr", owner: "A. Kapoor",   status: "In Review" },
  { id: "BR-2411-044", dept: "IT & Digital", amount: "₹11.90 Cr", owner: "P. Verma",    status: "Approved" },
  { id: "BR-2411-045", dept: "R&D",          amount: "₹6.45 Cr",  owner: "N. Rao",      status: "Held"     },
];

const NAV = [
  { key: "dashboard", label: "Dashboard",         icon: LayoutDashboard },
  { key: "prepare",   label: "Budget Preparation", icon: FileSpreadsheet },
  { key: "approvals", label: "Approvals",         icon: CheckCircle2,    badge: 8 },
  { key: "reports",   label: "Reports & Analytics", icon: BarChart3 },
  { key: "users",     label: "Users & Roles",     icon: Users },
  { key: "settings",  label: "Settings",          icon: Settings },
];

function statusClass(s) {
  const k = s.toLowerCase().replace(/[^a-z]/g, "");
  return `pill pill-${k}`;
}

export default function Dashboard({ onLogout }) {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="dash-root" data-testid="dashboard-page">
      {/* Sidebar */}
      <aside className="dash-sidebar" data-testid="dash-sidebar">
        <div className="side-brand">
          <div className="side-emblem">₹</div>
          <div className="side-brand-text">
            <div className="side-brand-title">Budget <b>Mitra</b></div>
            <div className="side-brand-sub">SERPL Portal</div>
          </div>
        </div>

        <nav className="side-nav">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                className={`side-nav-item ${isActive ? "is-active" : ""}`}
                onClick={() => setActive(item.key)}
                data-testid={`nav-${item.key}`}
              >
                <Icon size={19} strokeWidth={1.9} />
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        <div className="side-footer">
          <div className="side-user">
            <div className="side-user-avatar">BM</div>
            <div>
              <div className="side-user-name">Budget Manager</div>
              <div className="side-user-role">SERPL · Admin</div>
            </div>
          </div>
          <button className="side-logout" onClick={onLogout} data-testid="logout-button">
            <LogOut size={16} strokeWidth={2} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="dash-main">
        {/* Top bar */}
        <header className="dash-topbar" data-testid="dash-topbar">
          <div className="topbar-title">
            <div className="crumbs">
              <span>SERPL</span> <ChevronRight size={14} /> <span>Dashboard</span>
            </div>
            <h1>Good morning, <span>Budget Manager</span></h1>
            <p>Here’s what’s happening with your revenue budget today.</p>
          </div>
          <div className="topbar-actions">
            <div className="topbar-search">
              <Search size={16} strokeWidth={1.9} />
              <input placeholder="Search budgets, approvals, users…" data-testid="topbar-search" />
              <span className="kbd">⌘K</span>
            </div>
            <button className="icon-btn" aria-label="Notifications" data-testid="notifications-button">
              <Bell size={18} strokeWidth={1.9} />
              <span className="dot" />
            </button>
            <div className="topbar-avatar" title="Budget Manager">BM</div>
          </div>
        </header>

        {/* Content */}
        <main className="dash-content">
          {/* KPI row */}
          <section className="kpi-row" data-testid="kpi-row">
            {KPIS.map(({ key, label, value, delta, trend, icon: Icon, tone }) => (
              <article key={key} className={`kpi-card kpi-${tone}`} data-testid={`kpi-${key}`}>
                <div className="kpi-icon"><Icon size={22} strokeWidth={2} /></div>
                <div className="kpi-body">
                  <div className="kpi-label">{label}</div>
                  <div className="kpi-value">{value}</div>
                  <div className={`kpi-delta ${trend === "up" ? "up" : "down"}`}>
                    {trend === "up" ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                    {delta} <span>vs last quarter</span>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Charts row */}
          <section className="charts-row">
            <article className="chart-card chart-primary" data-testid="chart-planned-actual">
              <header className="chart-head">
                <div>
                  <h3>Planned vs Actual Spend</h3>
                  <p>Revenue budget utilisation across FY quarters (in ₹ Cr)</p>
                </div>
                <div className="chart-legend">
                  <span><i className="dot-blue"/> Planned</span>
                  <span><i className="dot-orange"/> Actual</span>
                </div>
              </header>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={AREA_DATA} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gPlanned" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1F3C88" stopOpacity={0.35}/>
                        <stop offset="100%" stopColor="#1F3C88" stopOpacity={0.02}/>
                      </linearGradient>
                      <linearGradient id="gActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E97F3A" stopOpacity={0.4}/>
                        <stop offset="100%" stopColor="#E97F3A" stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="#EEF0F5" vertical={false}/>
                    <XAxis dataKey="m" tick={{ fill: "#6A7691", fontSize: 12 }} axisLine={false} tickLine={false}/>
                    <YAxis tick={{ fill: "#6A7691", fontSize: 12 }} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #eef0f5", boxShadow: "0 10px 24px rgba(31,60,136,.08)" }}/>
                    <Area type="monotone" dataKey="planned" stroke="#1F3C88" strokeWidth={2.4} fill="url(#gPlanned)" />
                    <Area type="monotone" dataKey="actual"  stroke="#E97F3A" strokeWidth={2.4} fill="url(#gActual)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="chart-card chart-secondary" data-testid="chart-department">
              <header className="chart-head">
                <div>
                  <h3>Department Split</h3>
                  <p>Approved vs pending (₹ Cr)</p>
                </div>
              </header>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={BAR_DATA} margin={{ top: 6, right: 8, left: -14, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#EEF0F5" vertical={false}/>
                    <XAxis dataKey="dept" tick={{ fill: "#6A7691", fontSize: 11 }} axisLine={false} tickLine={false} interval={0} />
                    <YAxis tick={{ fill: "#6A7691", fontSize: 11 }} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #eef0f5" }}/>
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "#455066" }}/>
                    <Bar dataKey="approved" name="Approved" stackId="a" fill="#6C46A5" radius={[6,6,0,0]}/>
                    <Bar dataKey="pending"  name="Pending"  stackId="a" fill="#E97F3A" radius={[6,6,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>

          {/* Table + side actions */}
          <section className="bottom-row">
            <article className="table-card" data-testid="approvals-table">
              <header className="table-head">
                <div>
                  <h3>Recent Budget Requests</h3>
                  <p>Requires your attention this week</p>
                </div>
                <div className="table-actions">
                  <button className="ghost-btn"><Filter size={15}/> Filter</button>
                  <button className="ghost-btn"><Download size={15}/> Export</button>
                </div>
              </header>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Department</th>
                      <th>Amount</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {APPROVALS.map((r) => (
                      <tr key={r.id} data-testid={`row-${r.id}`}>
                        <td className="mono">{r.id}</td>
                        <td>{r.dept}</td>
                        <td className="strong">{r.amount}</td>
                        <td>{r.owner}</td>
                        <td><span className={statusClass(r.status)}>{r.status}</span></td>
                        <td><button className="row-cta">Review <ChevronRight size={14}/></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <aside className="side-actions">
              <article className="quick-card">
                <div className="quick-head">
                  <h3>Quick actions</h3>
                  <TrendingUp size={16} className="quick-icon"/>
                </div>
                <button className="quick-primary" data-testid="quick-new-budget">
                  <Plus size={16} strokeWidth={2.4}/> New budget request
                </button>
                <button className="quick-secondary">Import from Excel</button>
                <button className="quick-secondary">Generate FY report</button>
              </article>

              <article className="tips-card">
                <div className="tips-badge">Tip</div>
                <h4>Close FY-Q3 books faster</h4>
                <p>You have <b>8 pending approvals</b> older than 5 days. Nudge owners to close them before quarter-end.</p>
                <button className="tips-cta">Send reminders <ChevronRight size={14}/></button>
              </article>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
