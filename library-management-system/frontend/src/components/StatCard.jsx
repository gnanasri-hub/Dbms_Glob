export default function StatCard({ label, value, note, icon: Icon, tone }) {
  return (
    <article className="stat-card glass-card">
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        <p className="stat-note">{note}</p>
      </div>
      <span className={`stat-icon ${tone}`}><Icon size={20} strokeWidth={1.8} /></span>
    </article>
  );
}
