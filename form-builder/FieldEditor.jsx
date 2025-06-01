export default function FieldEditor({ field, onChange, onDelete }) {
  if (!field) return <div>Select a field to edit</div>;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2">
      <h2 className="text-lg font-bold">Edit Field</h2>
      <label className="block">
        Label:
        <input
          type="text"
          value={field.label}
          onChange={(e) => onChange({ ...field, label: e.target.value })}
          className="input"
        />
      </label>
      <label className="block">
        Type:
        <select
          value={field.type}
          onChange={(e) => onChange({ ...field, type: e.target.value })}
          className="input"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
        </select>
      </label>
      <button onClick={() => onDelete(field.id)} className="btn bg-red-500 hover:bg-red-600">Delete</button>
    </div>
  );
}
