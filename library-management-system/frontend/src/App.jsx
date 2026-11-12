import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AppLayout from "./layouts/AppLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import StudentsPage from "./pages/StudentsPage.jsx";
import StudentForm from "./components/StudentForm.jsx";
import { useStudents } from "./context/StudentsContext.jsx";
import { useState } from "react";

export default function App() {
  const { students, addStudent, updateStudent } = useStudents();
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="students/new" element={<StudentFormPage onSave={addStudent} />} />
        <Route path="students/:id/edit" element={<EditStudentPage students={students} onSave={updateStudent} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function StudentFormPage({ onSave }) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  async function save(values) {
    setSaving(true);
    try {
      await onSave(values);
      navigate("/students");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || "Unable to add student.");
    } finally {
      setSaving(false);
    }
  }

  return <div className="page-enter"><StudentForm onSubmit={save} saving={saving} /></div>;
}

function EditStudentPage({ students, onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const student = students.find((item) => String(item.id) === id);

  async function save(values) {
    setSaving(true);
    try {
      await onSave(id, values);
      navigate("/students");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || "Unable to update student.");
    } finally {
      setSaving(false);
    }
  }

  if (!student) return <div className="not-found glass-card"><span className="empty-icon">?</span><h2>Student not found</h2><p>This record may have been removed or is not available.</p><button className="button button-primary" type="button" onClick={() => navigate("/students")}>Back to directory</button></div>;
  return <div className="page-enter"><StudentForm key={student.id} student={student} onSubmit={save} saving={saving} /></div>;
}
