import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ student, onCancel, onConfirm, busy }) {
  if (!student) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && !busy && onCancel()}>
      <section className="confirm-modal glass-card" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
        <span className="confirm-icon"><AlertTriangle size={22} /></span>
        <h2 id="delete-title">Delete student record?</h2>
        <p>This will permanently remove <strong>{student.name}</strong> ({student.studentId}) from the directory.</p>
        <div className="modal-actions">
          <button type="button" className="button button-secondary" onClick={onCancel} disabled={busy}>Keep record</button>
          <button type="button" className="button button-danger" onClick={onConfirm} disabled={busy}>
            {busy ? <span className="button-spinner" /> : null}{busy ? "Deleting…" : "Delete record"}
          </button>
        </div>
      </section>
    </div>
  );
}
