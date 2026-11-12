import { useState } from "react";
import { BookOpen, ChevronDown, Command, LayoutDashboard, LibraryBig, Menu, Moon, Plus, Search, Sun, UsersRound, X } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Avatar from "../components/Avatar.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useStudents } from "../context/StudentsContext.jsx";

export default function AppLayout() {
  const { dark, toggleTheme } = useTheme();
  const { students } = useStudents();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const activeStudent = students[0];
  const pageTitle = location.pathname.startsWith("/students/new") ? "Add a student"
    : location.pathname.includes("/edit") ? "Edit student"
      : location.pathname.startsWith("/students") ? "Student directory" : "Overview";

  function closeMenu() { setMenuOpen(false); }

  return (
    <div className={`app-shell ${menuOpen ? "menu-open" : ""}`}>
      {menuOpen ? <button type="button" className="sidebar-backdrop" onClick={closeMenu} aria-label="Close navigation" /> : null}
      <aside className="sidebar">
        <div className="brand"><span className="brand-icon"><LibraryBig size={19} strokeWidth={1.8} /></span><span>northstar<span className="brand-dot">.</span><small>LIBRARY SYSTEM</small></span><button className="icon-button sidebar-mobile-close" type="button" onClick={closeMenu} aria-label="Close navigation"><X size={19} /></button></div>
        <div className="workspace-switch"><span className="workspace-icon"><BookOpen size={16} /></span><span><strong>Campus library</strong><small>Student records</small></span><ChevronDown size={14} className="workspace-chevron" /></div>
        <p className="nav-section-label">WORKSPACE</p>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}><LayoutDashboard size={17} /><span>Overview</span></NavLink>
          <NavLink to="/students" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}><UsersRound size={17} /><span>Students</span><span className="nav-count">{students.length}</span></NavLink>
          <NavLink to="/students/new" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}><Plus size={17} /><span>Add student</span></NavLink>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note"><div className="sidebar-note-icon"><BookOpen size={16} /></div><strong>A world of knowledge</strong><span>Starts with an open door.</span><div className="note-line" /></div>
          <button className="sidebar-theme" type="button" onClick={toggleTheme}>{dark ? <Sun size={16} /> : <Moon size={16} />}<span>{dark ? "Light appearance" : "Dark appearance"}</span><span className={`theme-switch ${dark ? "switch-on" : ""}`}><i /></span></button>
          <div className="user-profile"><Avatar name={activeStudent?.name || "Library Admin"} size="sm" /><div><strong>Library Admin</strong><span>Administrator</span></div><button className="icon-button profile-menu" type="button" aria-label="Profile menu"><ChevronDown size={16} /></button></div>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <button type="button" className="icon-button mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div className="breadcrumb"><span>Library</span><span className="breadcrumb-separator">/</span><strong>{pageTitle}</strong></div>
          <div className="topbar-right">
            <div className="topbar-search"><Search size={15} /><span>Search anything…</span><kbd><Command size={11} /> K</kbd></div>
            <span className="topbar-divider" />
            <span className="admin-label">Library Admin</span><Avatar name="Library Admin" size="sm" />
          </div>
        </header>
        <div className="content-area"><Outlet /></div>
      </main>
    </div>
  );
}
