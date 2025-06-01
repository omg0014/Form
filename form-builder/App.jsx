import React, { useState, useEffect } from "react";
import FieldEditor from "./FieldEditor.jsx";
import LivePreview from "./LivePreview.jsx";
import { generateId } from "./utils.js";

export default function App() {
  const [fields, setFields] = useState(() => {
    try {
      const saved = localStorage.getItem("formFields");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    localStorage.setItem("formFields", JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addField = () => {
    const newField = {
      id: generateId(),
      label: "New Field",
      type: "text",
      required: false,
      options: [],
    };
    setFields((f) => [...f, newField]);
  };

  const updateField = (id, updates) => {
    setFields((f) =>
      f.map((field) => (field.id === id ? { ...field, ...updates } : field))
    );
  };

  const deleteField = (id) => {
    setFields((f) => f.filter((field) => field.id !== id));
  };

  return (
    <div className="app-container" style={{ padding: "1rem", maxWidth: "900px", margin: "auto" }}>
      <h1>React Form Builder</h1>
      <button onClick={addField} style={{ marginBottom: "1rem" }}>
        Add Field
      </button>
      <button
        onClick={() => setDarkMode((d) => !d)}
        style={{ marginLeft: "1rem", marginBottom: "1rem" }}
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div style={{ display: "flex", gap: "2rem" }}>
        <div style={{ flex: 1 }}>
          <h2>Field Editor</h2>
          {fields.length === 0 && <p>No fields yet. Click "Add Field".</p>}
          {fields.map((field) => (
            <FieldEditor
              key={field.id}
              field={field}
              onUpdate={updateField}
              onDelete={deleteField}
            />
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h2>Live Preview</h2>
          <LivePreview fields={fields} />
        </div>
      </div>
    </div>
  );
}
