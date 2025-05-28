import React from "react";

export default function FormField({ field, updateField, deleteField }) {
  return (
    <div className="field-card">
      <input type="text" className="w-full border rounded p-2 mb-2 dark:bg-gray-700 dark:text-white" value={field.label} onChange={e => updateField(field.id, { label: e.target.value })} placeholder="Label" />
      {field.type !== "Date" && (
        <input type="text" className="w-full border rounded p-2 mb-2 dark:bg-gray-700 dark:text-white" value={field.placeholder} onChange={e => updateField(field.id, { placeholder: e.target.value })} placeholder="Placeholder" />
      )}
      {["Text", "Textarea"].includes(field.type) && (
        <>
          <input type="number" className="w-full border rounded p-2 mb-2 dark:bg-gray-700 dark:text-white" value={field.min} onChange={e => updateField(field.id, { min: e.target.value })} placeholder="Min Length" />
          <input type="number" className="w-full border rounded p-2 mb-2 dark:bg-gray-700 dark:text-white" value={field.max} onChange={e => updateField(field.id, { max: e.target.value })} placeholder="Max Length" />
        </>
      )}
      {field.type === "Dropdown" && (
        <input type="text" className="w-full border rounded p-2 mb-2 dark:bg-gray-700 dark:text-white" value={field.options} onChange={e => updateField(field.id, { options: e.target.value })} placeholder="Options (comma separated)" />
      )}
      <label className="inline-flex items-center">
        <input type="checkbox" className="mr-2" checked={field.required} onChange={e => updateField(field.id, { required: e.target.checked })} />
        Required
      </label>
      <button className="ml-4 text-red-500 hover:underline" onClick={() => deleteField(field.id)}>Delete</button>
    </div>
  );
}
