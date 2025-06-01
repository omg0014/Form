import React, { useState, useEffect } from "react";
import FieldEditor from "./FieldEditor.jsx";
import LivePreview from "./LivePreview.jsx";
import {
  generateId,
  saveFormToLocalStorage,
  loadFormFromLocalStorage,
  copyToClipboard,
} from "./utils.js";

const App = () => {
  const [fields, setFields] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedForm = loadFormFromLocalStorage();
    if (savedForm) setFields(savedForm);

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    saveFormToLocalStorage(fields);
  }, [fields]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const addField = (type) => {
    const newField = {
      id: generateId(),
      label: `Untitled ${type}`,
      type,
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id, updatedField) => {
    setFields(fields.map((f) => (f.id === id ? updatedField : f)));
  };

  const deleteField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const moveField = (fromIndex, toIndex) => {
    const updated = [...fields];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setFields(updated);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const copyLink = () => {
    const shareURL = `${window.location.origin}${window.location.pathname}?form=${btoa(
      JSON.stringify(fields)
    )}`;
    copyToClipboard(shareURL);
    alert("Link copied!");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Form Builder</h1>
        <div className="space-x-2">
          <button onClick={() => addField("text")} className="btn">
            Add Text
          </button>
          <button onClick={() => addField("checkbox")} className="btn">
            Add Checkbox
          </button>
          <button onClick={copyLink} className="btn">
            Copy Share Link
          </button>
          <button onClick={toggleTheme} className="btn">
            Toggle {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Edit Fields</h2>
          <div className="space-y-3">
            {fields.map((field, idx) => (
              <FieldEditor
                key={field.id}
                field={field}
                index={idx}
                onChange={updateField}
                onDelete={deleteField}
                onMove={moveField}
                isFirst={idx === 0}
                isLast={idx === fields.length - 1}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
          <LivePreview fields={fields} />
        </div>
      </div>
    </div>
  );
};

export default App;
