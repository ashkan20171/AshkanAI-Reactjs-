import { createContext, useState, useContext, useEffect } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("ashkanai_projects");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("ashkanai_projects", JSON.stringify(projects));
  }, [projects]);

  const createProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (id, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProjectContext.Provider
      value={{ projects, createProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => useContext(ProjectContext);
