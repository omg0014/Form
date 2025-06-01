export default function Toolbar({ onAddField, toggleTheme }) {
  return (
    <div className="flex gap-2">
      <button onClick={onAddField} className="btn">Add Field</button>
      <button onClick={toggleTheme} className="btn">Toggle Theme</button>
    </div>
  );
}
