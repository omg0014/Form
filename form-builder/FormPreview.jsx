export default function FormPreview({ fields }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2">
      <h2 className="text-lg font-bold">Preview</h2>
      <form className="space-y-2">
        {fields.map(field => (
          <label key={field.id} className="block">
            {field.label}:
            <input type={field.type} className="input" />
          </label>
        ))}
      </form>
    </div>
  );
}
