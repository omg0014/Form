import React, { useEffect } from "https://esm.sh/react";
import FieldEditor from "./FieldEditor.jsx";
import FieldList from "./FieldList.jsx";
import FormPreview from "./FormPreview.jsx";
import Toolbar from "./Toolbar.jsx";
import { useAppState } from "./state.js";

export default function App() {
  const {
    fields,
    setFields,
    selectedField,
    setSelectedField,
    theme,
    toggleTheme,
  } = useAppState();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-4">
      <Toolbar
        onAddField={() =>
          setFields([...fields, { id: Date.now(), label: "Untitled", type: "text" }])
        }
        toggleTheme={toggleTheme}
      />
      <div className="grid md:grid-cols-3 gap-4">
        <FieldList
          fields={fields}
          onSelectField={setSelectedField}
          onReorderFields={setFields}
          selectedFieldId={selectedField?.id}
        />
        <FieldEditor
          field={selectedField}
          onChange={(updatedField) =>
            setFields(fields.map(f => f.id === updatedField.id ? updatedField : f))
          }
          onDelete={(id) =>
            setFields(fields.filter(f => f.id !== id))
          }
        />
        <FormPreview fields={fields} />
      </div>
    </div>
  );
}
