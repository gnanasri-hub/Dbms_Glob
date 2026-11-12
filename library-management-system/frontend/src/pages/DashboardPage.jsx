import { ArrowRight, ArrowUpRight, BookOpen, Plus, Sparkles, Users, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar.jsx";
import StatCard from "../components/StatCard.jsx";
import { useStudents } from "../context/StudentsContext.jsx";

export default function DashboardPage() {
  const { students, loading, loadError, refresh } = useStudents();
  const departments = new Set(students.map((student) => student.department).filter(Boolean)).size;
  const recent = [...students].slice(-5).reverse();

  return (
    <div className="dashboard-page page-enter">
      <section className="welcome-banner">
        <div className="welcome-copy">
          <span className="welcome-label"><Sparkles size={13} /> YOUR LIBRARY, IN GOOD COMPANY</span>
          <h1>A little more room<br />for <em>every story.</em></h1>
          <p>Keep your student community organized, connected, and ready for their next chapter.</p>
          <div className="welcome-actions">
            <Link to="/students/new" className="button button-light"><Plus size={16} /> Add a student</Link>
            <Link to="/students" className="welcome-text-link">Explore directory <ArrowRight size={15} /></Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-book book-back"><span /></div>
          <div className="hero-book book-front"><span /><span /><span /></div>
          <div className="hero-sparkle sparkle-one">✦</div><div className="hero-sparkle sparkle-two">✦</div>
          <div className="hero-float"><BookOpen size={18} /><span>Knowledge<br />lives here</span></div>
        </div>
        <div className="banner-bottom"><span>Thoughtful records. Brighter possibilities.</span><span className="banner-mark">NORTHSTAR <i>✳</i></span></div>
      </section>

      <div className="section-title-row">
        <div><span className="page-kicker">AT A GLANCE</span><h2>Your library, today</h2></div>
        <span className="updated-label"><span /> Live records</span>
      </div>
      <section className="stats-grid" aria-label="Library statistics">
        <StatCard label="Total students" value={loading || loadError ? "—" : students.length.toLocaleString()} note="Student records in your library" icon={UsersRound} tone="tone-blue" />
        <StatCard label="Departments" value={loading || loadError ? "—" : departments.toLocaleString()} note="Across your student community" icon={BookOpen} tone="tone-violet" />
        <StatCard label="Active records" value={loading || loadError ? "—" : students.length.toLocaleString()} note="All records currently on file" icon={Users} tone="tone-green" />
      </section>

      <section className="dashboard-bottom">
        <div className="recent-card glass-card">
          <div className="card-heading">
            <div><span className="page-kicker">FRESHLY FILED</span><h2>Recently added</h2></div>
            <Link to="/students" className="subtle-link">View all <ArrowUpRight size={15} /></Link>
          </div>
          {loading ? <LoadingRows /> : loadError ? <div className="empty-recent"><span className="empty-icon"><UsersRound size={20} /></span><strong>Records are unavailable</strong><p>{loadError}</p><button type="button" className="subtle-link retry-link" onClick={() => refresh().catch(() => {})}>Try again <ArrowRight size={14} /></button></div> : recent.length ? (
            <div className="recent-list">
              {recent.map((student) => <div className="recent-row" key={student.id}>
                <Avatar name={student.name} size="sm" />
                <div className="recent-name"><strong>{student.name}</strong><span>{student.studentId}</span></div>
                <span className="department-chip">{student.department}</span>
              </div>)}
            </div>
          ) : <div className="empty-recent"><span className="empty-icon"><UsersRound size={20} /></span><strong>Your directory is ready</strong><p>Add your first student to get started.</p><Link to="/students/new" className="subtle-link">Add a student <ArrowRight size={14} /></Link></div>}
        </div>
        <aside className="tip-card">
          <div className="tip-graphic"><span /><BookOpen size={25} /><i>✳</i></div>
          <span className="page-kicker">A GOOD PLACE TO START</span>
          <h2>Every great library starts with its people.</h2>
          <p>Add your students to create a directory that is as welcoming as your reading room.</p>
          <Link to="/students/new" className="tip-link">Create a student record <ArrowRight size={15} /></Link>
        </aside>
      </section>
      <footer className="page-footer"><span>Made for curious minds.</span><span>Northstar Library <i>✳</i></span></footer>
    </div>
  );
}

function LoadingRows() {
  return <div className="recent-list" aria-label="Loading student records">{[1, 2, 3].map((item) => <div className="recent-row" key={item}><span className="skeleton skeleton-avatar" /><span className="skeleton skeleton-text" /><span className="skeleton skeleton-chip" /></div>)}</div>;
}
