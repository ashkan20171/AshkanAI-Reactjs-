import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function FileManager() {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ashkanai_files")) || [];
    setFiles(saved);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      owner: user.email,
      uploadedAt: new Date().toISOString(),
    };

    const updated = [...files, newFile];
    setFiles(updated);
    localStorage.setItem("ashkanai_files", JSON.stringify(updated));
  };

  const deleteFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    localStorage.setItem("ashkanai_files", JSON.stringify(updated));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 800 }}>
      <h3 className="fw-bold mb-4">📁 مدیریت فایل‌ها</h3>

      {/* Upload */}
      <input type="file" className="form-control mb-4" onChange={handleUpload} />

      {/* Files list */}
      <div className="list-group">
        {files.length === 0 && (
          <p className="text-center text-muted">فایلی وجود ندارد.</p>
        )}

        {files.map((file, index) => (
          <div
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{file.name}</strong>
              <div className="text-muted small">
                {Math.round(file.size / 1024)} KB
              </div>
            </div>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteFile(index)}
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
