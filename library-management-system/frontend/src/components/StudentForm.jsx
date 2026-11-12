import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ChevronDown, Mail, RotateCcw, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar.jsx";

const departments = ["AIML", "CSE", "ECE", "EEE", "IT", "Civil", "Mechanical", "Other"];

export default function StudentForm({ student, onSubmit, saving }) {
  const [values, setValues] = useState({
    studentId: student?.studentId || "",
    name: student?.name || "",
    email: student?.email || "",
    department: student?.department || "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const errors = useMemo(() => validate(values), [values]);
  const isEditing = Boolean(student);

  useEffect(() => {
    setValues({
      studentId: student?.studentId || "",
      name: student?.name || "",
      email: student?.email || "",
      department: student?.department || "",
    });
  }, [student]);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function reset() {
    setValues({ studentId: "", name: "", email: "", department: "" });
    setTouched({});
    setSubmitted(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setTouched({ studentId: true, name: true, email: true, department: true });
    if (Object.keys(errors).length) return;
    await onSubmit(Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()])));
  }

  return (
    <div className="form-page">
      <Link to={isEditing ? "/students" : "/"} className="back-link"><ArrowLeft size={16} /> Back to {isEditing ? "students" : "dashboard"}</Link>
      <div className="form-heading">
        <span className="page-kicker">{isEditing ? "STUDENT DIRECTORY" : "NEW RECORD"}</span>
        <h1>{isEditing ? "Edit student" : "Add a student"}</h1>
        <p>{isEditing ? "Update the student information below." : "Create a new student record for your library."}</p>
      </div>
      <form className="form-card glass-card" onSubmit={handleSubmit} noValidate>
        <div className="form-profile">
          <Avatar name={values.name || "New student"} size="xl" />
          <div><strong>{values.name || "Student profile"}</strong><span>{values.studentId || "Your student ID will appear here"}</span></div>
          <span className="profile-badge"><UserRound size={14} /> Profile</span>
        </div>
        <div className="form-divider" />
        <div className="form-grid">
          <FloatingField label="Student ID" name="studentId" value={values.studentId} onChange={update} onBlur={() => setTouched({ ...touched, studentId: true })} error={(touched.studentId || submitted) && errors.studentId} placeholder="e.g. 25241A6601" />
          <FloatingField label="Full name" name="name" value={values.name} onChange={update} onBlur={() => setTouched({ ...touched, name: true })} error={(touched.name || submitted) && errors.name} placeholder="e.g. Alex Morgan" autoComplete="name" />
          <FloatingField label="Email address" name="email" type="email" icon={Mail} value={values.email} onChange={update} onBlur={() => setTouched({ ...touched, email: true })} error={(touched.email || submitted) && errors.email} placeholder="name@university.edu" autoComplete="email" />
          <div className={`field-wrap ${values.department ? "has-value" : ""} ${(touched.department || submitted) && errors.department ? "field-error" : ""}`}>
            <label htmlFor="department">Department</label>
            <select id="department" value={values.department} onChange={(event) => update("department", event.target.value)} onBlur={() => setTouched({ ...touched, department: true })}>
              <option value="" disabled></option>
              {!departments.includes(values.department) && values.department ? <option value={values.department}>{values.department}</option> : null}
              {departments.map((department) => <option key={department} value={department}>{department}</option>)}
            </select>
            <ChevronDown className="select-chevron" size={16} />
            {(touched.department || submitted) && errors.department ? <span className="field-message">{errors.department}</span> : null}
          </div>
        </div>
        <div className="form-footer">
          <button type="button" className="button button-secondary reset-button" onClick={reset} disabled={saving}><RotateCcw size={15} /> Reset</button>
          <div className="form-footer-right">
            <Link to={isEditing ? "/students" : "/"} className="button button-quiet">Cancel</Link>
            <button type="submit" className="button button-primary" disabled={saving}>
              {saving ? <span className="button-spinner" /> : <Check size={16} />}
              {saving ? "Saving…" : isEditing ? "Save changes" : "Add student"}
            </button>
          </div>
        </div>
      </form>
      <p className="form-security-note"><span /> Student information is stored securely in your library database.</p>
    </div>
  );
}

function FloatingField({ label, name, value, onChange, onBlur, error, placeholder, type = "text", autoComplete, icon: Icon }) {
  return (
    <div className={`field-wrap ${value ? "has-value" : ""} ${error ? "field-error" : ""} ${Icon ? "has-field-icon" : ""}`}>
      {Icon ? <Icon size={17} className="field-icon" /> : null}
      <input id={name} name={name} type={type} value={value} onChange={(event) => onChange(name, event.target.value)} onBlur={onBlur} placeholder=" " autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
      <label htmlFor={name}>{label}</label>
      {placeholder ? <span className="field-placeholder">{placeholder}</span> : null}
      {error ? <span id={`${name}-error`} className="field-message">{error}</span> : null}
    </div>
  );
}

function validate(values) {
  const errors = {};
  if (!values.studentId.trim()) errors.studentId = "Student ID is required.";
  if (!values.name.trim()) errors.name = "Student name is required.";
  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.department) errors.department = "Select a department.";
  return errors;
}
