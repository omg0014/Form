export default function FieldList({ fields, onSelectField, onReorderFields, selectedFieldId }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2">
      <h2 className="text-lg font-bold">Fields</h2>
      {fields.map((field, idx) => (
        <div
          key={field.id}
          className={`p-2 rounded border ${field.id === selectedFieldId ? 'border-blue-500' : 'border-gray-300'} cursor-pointer`}
          onClick={() => onSelectField(field)}
        >
          {field.label} ({field.type})
        </div>
      ))}
    </div>
  );
}
