import React, { useEffect, useState } from "react";
import FormField from "./components/FormField.jsx";
import { templates } from "./utils/templates.js";

export default function App() {
  const [history, setHistory] = useState({
    past: [],
    present: JSON.parse(localStorage.getItem("formFields")) || [],
    future: [],
  });
  const [templateClass, setTemplateClass] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [copiedLink, setCopiedLink] = useState("");

  const { past, present: fields, future } = history;

  useEffect(() => {
    document.body.className = localStorage.getItem("theme") || "light";
    const params = new URLSearchParams(window.location.search);
    const formId = params.get("formId");
    const isEdit = params.get("edit") === "true";
    if (formId) {
      const savedForm = JSON.parse(localStorage.getItem(`form-${formId}`));
      if (savedForm) {
        setHistory({ past: [], present: savedForm, future: [] });
        setIsPreview(!isEdit);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formFields", JSON.stringify(fields));
  }, [fields]);

  function setFields(newFields) {
    setHistory({
      past: [...past, fields],
      present: newFields,
      future: [],
    });
  }

  function addField(type) {
    const id = Date.now();
    setFields([
      ...fields,
      {
        id,
        type,
        label: "",
        placeholder: "",
        required: false,
        min: "",
        max: "",
        options: "",
      },
    ]);
  }

  function updateField(id, changes) {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...changes } : f)));
  }

  function deleteField(id) {
    setFields(fields.filter((f) => f.id !== id));
  }

  function undo() {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setHistory({
      past: past.slice(0, -1),
      present: previous,
      future: [fields, ...future],
    });
  }

  function redo() {
    if (future.length === 0) return;
    const next = future[0];
    setHistory({
      past: [...past, fields],
      present: next,
      future: future.slice(1),
    });
  }

  function applyTemplate(name) {
    const tempFields = templates[name].map(f => ({ ...f, id: Date.now() + Math.random() }));
    setFields(tempFields);
    setTemplateClass(`template-${name}`);
  }

  function generateLink(editable = false) {
    const formId = Date.now().toString();
    localStorage.setItem(`form-${formId}`, JSON.stringify(fields));
    const url = `${window.location.origin}${window.location.pathname}?formId=${formId}${editable ? '&edit=true' : ''}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
  }

  function onSubmit(e) {
    e.preventDefault();
    alert("You have successfully filled the form!");
    window.location.reload();
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {!isPreview && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Text", "Textarea", "Date", "Dropdown", "Checkbox"].map(type => (
              <button key={type} onClick={() => addField(type)} className="bg-blue-500 text-white px-3 py-1 rounded">{type}</button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(templates).map(t => (
              <button key={t} onClick={() => applyTemplate(t)} className={`template-${t}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => generateLink(false)} className="bg-green-600 text-white px-3 py-1 rounded">Copy View Link</button>
            <button onClick={() => generateLink(true)} className="bg-yellow-600 text-white px-3 py-1 rounded">Copy Editable Link</button>
            <button onClick={undo} disabled={past.length === 0} className="bg-gray-600 text-white px-3 py-1 rounded">Undo</button>
            <button onClick={redo} disabled={future.length === 0} className="bg-gray-600 text-white px-3 py-1 rounded">Redo</button>
          </div>

          {fields.map(field => (
            <FormField key={field.id} field={field} updateField={updateField} deleteField={deleteField} />
          ))}
          {copiedLink && <div className="copy-link-box">{copiedLink}</div>}
        </>
      )}

      {fields.length > 0 && (
        <form onSubmit={onSubmit} className={`form-preview mt-10 ${templateClass}`}>
          {fields.map(field => (
            <div key={field.id} className="mb-4">
              <label className="block font-bold mb-1">{field.label}</label>
              {field.type === "Text" && <input type="text" required={field.required} placeholder={field.placeholder} minLength={field.min} maxLength={field.max} className="w-full border p-2 rounded" />}
              {field.type === "Textarea" && <textarea required={field.required} placeholder={field.placeholder} minLength={field.min} maxLength={field.max} className="w-full border p-2 rounded" />}
              {field.type === "Date" && <input type="date" required={field.required} className="w-full border p-2 rounded" />}
              {field.type === "Dropdown" && (
                <select required={field.required} className="w-full border p-2 rounded">
                  <option value="">Select</option>
                  {field.options.split(",").map((opt, i) => <option key={i}>{opt.trim()}</option>)}
                </select>
              )}
              {field.type === "Checkbox" && (
                <div className="flex items-center">
                  <input type="checkbox" required={field.required} className="mr-2" />
                  <span>{field.placeholder || "Check me"}</span>
                </div>
              )}
            </div>
          ))}
          {isPreview && <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">Submit</button>}
        </form>
      )}
    </div>
  );
}
