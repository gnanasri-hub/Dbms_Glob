import { useEffect } from "react";
import { BookOpen, CalendarDays, GraduationCap, Mail, X } from "lucide-react";
import Avatar from "./Avatar.jsx";

export default function StudentDetailsModal({ student, onClose, onEdit }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!student) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="detail-modal glass-card" role="dialog" aria-modal="true" aria-labelledby="student-detail-title">
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close details"><X size={18} /></button>
        <div className="detail-heading">
          <div className="detail-avatar-wrap"><Avatar name={student.name} size="xl" /></div>
          <span className="status-pill"><span /> Active record</span>
          <h2 id="student-detail-title">{student.name}</h2>
          <p>{student.studentId}</p>
        </div>
        <div className="detail-grid">
          <Detail icon={Mail} label="Email address" value={student.email} />
          <Detail icon={GraduationCap} label="Department" value={student.department} />
          <Detail icon={BookOpen} label="Library record" value="Student" />
          <Detail icon={CalendarDays} label="Registration date" value="Not recorded" />
        </div>
        <p className="detail-footnote">Registration dates are not currently provided by the student records service.</p>
        <div className="modal-actions">
          <button type="button" className="button button-secondary" onClick={onClose}>Close</button>
          <button type="button" className="button button-primary" onClick={() => onEdit(student)}>Edit student</button>
        </div>
      </section>
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="detail-item">
      <span className="detail-icon"><Icon size={16} /></span>
      <div><p>{label}</p><strong>{value}</strong></div>
    </div>
  );
}
