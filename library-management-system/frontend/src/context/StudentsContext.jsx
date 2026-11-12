import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { studentsApi } from "../services/students.js";

const StudentsContext = createContext(null);

export function StudentsProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      setStudents(await studentsApi.list());
    } catch (error) {
      const message = error.response?.data?.error || error.message || "Unable to load student records.";
      setLoadError(message);
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh().catch(() => {});
  }, [refresh]);

  const addStudent = useCallback(async (student) => {
    const created = await studentsApi.create(student);
    setStudents((current) => [...current, created]);
    toast.success("Student added successfully");
    return created;
  }, []);

  const updateStudent = useCallback(async (id, student) => {
    const updated = await studentsApi.update(id, student);
    setStudents((current) => current.map((item) => (String(item.id) === String(id) ? updated : item)));
    toast.success("Student details updated");
    return updated;
  }, []);

  const deleteStudent = useCallback(async (id) => {
    await studentsApi.remove(id);
    setStudents((current) => current.filter((item) => String(item.id) !== String(id)));
    toast.success("Student record removed");
  }, []);

  const value = useMemo(
    () => ({ students, loading, loadError, refresh, addStudent, updateStudent, deleteStudent }),
    [students, loading, loadError, refresh, addStudent, updateStudent, deleteStudent],
  );

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
}

export function useStudents() {
  const context = useContext(StudentsContext);
  if (!context) throw new Error("useStudents must be used within a StudentsProvider.");
  return context;
}
