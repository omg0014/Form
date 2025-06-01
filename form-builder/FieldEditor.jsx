import React from "react";

export default function FieldEditor({ field, onUpdate, onDelete }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;

    if (name === "options") {
      // Split options by newline
      val = val.split("\n").map((opt) => opt.trim()).filter(Boolean);
    }

    onUpdate(field.id, { [name]: val });
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "0.375rem",
        padding: "0.75rem",
        marginBottom: "1rem",
      }}
    >
      <label>
        Label:
        <input
          name="label"
          value={field.label}
          onChange={handleChange}
          type="text"
        />
      </label>

      <label>
        Type:
        <select name="type" value={field.type} onChange={handleChange}>
          <option value="text">Text</option>
          <option value="textarea">Textarea</option>
          <option value="select">Select</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>
      </label>

      {["select", "radio"].includes(field.type) && (
        <label>
          Options (one per line):
          <textarea
            name="options"
            value={field.options.join("\n")}
            onChange={handleChange}
          />
        </label>
      )}

      <label>
        Required:
        <input
          type="checkbox"
          name="required"
          checked={field.required}
          onChange={handleChange}
        />
      </label>

      <button onClick={() => onDelete(field.id)} style={{ backgroundColor: "#ef4444", marginTop: "0.5rem" }}>
        Delete Field
      </button>
    </div>
  );
}
