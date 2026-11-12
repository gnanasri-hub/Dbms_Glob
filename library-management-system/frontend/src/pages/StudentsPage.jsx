import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Eye, Filter, Pencil, Plus, Search, SlidersHorizontal, Trash2, UsersRound, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import StudentDetailsModal from "../components/StudentDetailsModal.jsx";
import { useStudents } from "../context/StudentsContext.jsx";

const PAGE_SIZE = 8;

export default function StudentsPage() {
  const { students, loading, loadError, refresh, deleteStudent } = useStudents();
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const departments = useMemo(() => [...new Set(students.map((student) => student.department).filter(Boolean))].sort(), [students]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return students.filter((student) => (!department || student.department === department)
      && [student.studentId, student.name, student.email, student.department].some((value) => String(value).toLocaleLowerCase().includes(needle)))
      .sort((a, b) => String(a[sortBy] || "").localeCompare(String(b[sortBy] || ""), undefined, { numeric: true, sensitivity: "base" }) * (sortDirection === "asc" ? 1 : -1));
  }, [students, query, department, sortBy, sortDirection]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [query, department, sortBy, sortDirection]);
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  function sort(field) {
    if (sortBy === field) setSortDirection((direction) => direction === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortDirection("asc"); }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteStudent(pendingDelete.id);
      setPendingDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || "Unable to delete student.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="students-page page-enter">
      <div className="students-heading">
        <div><span className="page-kicker">YOUR COMMUNITY</span><h1>Student directory</h1><p>All your student records, thoughtfully organized.</p></div>
        <Link to="/students/new" className="button button-primary"><Plus size={16} /> Add student</Link>
      </div>
      <section className="directory-card glass-card">
        <div className="directory-toolbar">
          <div className="directory-count"><span className="directory-count-icon"><UsersRound size={17} /></span><div><strong>{loading ? "Loading…" : filtered.length}</strong><span>{filtered.length === 1 ? "student record" : "student records"}</span></div></div>
          <div className="directory-filters">
            <label className="search-field"><Search size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search students…" aria-label="Search by name, ID, email, or department" />{query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button> : null}</label>
            <label className="filter-field"><Filter size={15} /><select value={department} onChange={(event) => setDepartment(event.target.value)} aria-label="Filter by department"><option value="">All departments</option>{departments.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          </div>
        </div>
        <div className="table-scroll">
          <table className="student-table">
            <thead><tr>
              <th><SortButton label="Student" field="name" sortBy={sortBy} direction={sortDirection} onSort={sort} /></th>
              <th><SortButton label="Student ID" field="studentId" sortBy={sortBy} direction={sortDirection} onSort={sort} /></th>
              <th>Email address</th><th>Department</th><th>Status</th><th className="actions-heading">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? <tr><td colSpan="6"><div className="table-loading"><span className="loader" /> Loading your directory…</div></td></tr>
                : loadError ? <tr><td colSpan="6"><div className="empty-table"><span className="empty-icon"><SlidersHorizontal size={20} /></span><strong>We couldn’t load the directory</strong><p>{loadError}</p><button type="button" className="button button-secondary" onClick={() => refresh().catch(() => {})}>Try again</button></div></td></tr>
                : pageRows.length ? pageRows.map((student) => <tr key={student.id}>
                  <td><div className="student-cell"><Avatar name={student.name} size="sm" /><div><strong>{student.name}</strong><span>{student.studentId}</span></div></div></td>
                  <td><span className="id-cell">{student.studentId}</span></td>
                  <td><span className="email-cell">{student.email}</span></td>
                  <td><span className="department-chip">{student.department}</span></td>
                  <td><span className="status-pill"><span /> Active</span></td>
                  <td><div className="row-actions">
                    <button className="row-action" type="button" onClick={() => setSelected(student)} aria-label={`View ${student.name}`} title="View details"><Eye size={16} /></button>
                    <button className="row-action" type="button" onClick={() => navigate(`/students/${student.id}/edit`)} aria-label={`Edit ${student.name}`} title="Edit student"><Pencil size={15} /></button>
                    <button className="row-action row-action-delete" type="button" onClick={() => setPendingDelete(student)} aria-label={`Delete ${student.name}`} title="Delete student"><Trash2 size={15} /></button>
                  </div></td>
                </tr>) : <tr><td colSpan="6"><div className="empty-table"><span className="empty-icon"><SlidersHorizontal size={20} /></span><strong>{students.length ? "No students match those filters" : "No student records yet"}</strong><p>{students.length ? "Try a different search or department." : "Add your first student to see them here."}</p>{students.length ? <button type="button" className="button button-secondary" onClick={() => { setQuery(""); setDepartment(""); }}>Clear filters</button> : <Link to="/students/new" className="button button-primary"><Plus size={15} /> Add student</Link>}</div></td></tr>}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>Showing <strong>{filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, filtered.length)}</strong> of <strong>{filtered.length}</strong></span>
          <div className="pagination-controls">
            <button className="pagination-button" type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft size={16} /></button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).slice(Math.max(0, Math.min(page - 2, pageCount - 3)), Math.max(3, Math.min(page - 2, pageCount - 3)) + 3).map((number) => <button key={number} type="button" className={`pagination-button ${number === page ? "is-current" : ""}`} onClick={() => setPage(number)} aria-current={number === page ? "page" : undefined}>{number}</button>)}
            <button className="pagination-button" type="button" aria-label="Next page" disabled={page >= pageCount} onClick={() => setPage((value) => value + 1)}><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>
      <footer className="page-footer"><span>Made for curious minds.</span><span>Northstar Library <i>✳</i></span></footer>
      <StudentDetailsModal student={selected} onClose={() => setSelected(null)} onEdit={(student) => navigate(`/students/${student.id}/edit`)} />
      <ConfirmDialog student={pendingDelete} onCancel={() => setPendingDelete(null)} onConfirm={confirmDelete} busy={deleting} />
    </div>
  );
}

function SortButton({ label, field, sortBy, direction, onSort }) {
  const active = sortBy === field;
  return <button type="button" className={`sort-button ${active ? "sort-active" : ""}`} onClick={() => onSort(field)}>{label}{active ? (direction === "asc" ? <ArrowUp size={13} /> : <ArrowDown size={13} />) : null}</button>;
}
