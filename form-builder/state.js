import { useState, useEffect } from "https://esm.sh/react";

export function useAppState() {
  const [fields, setFields] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fields")) || [];
    } catch {
      return [];
    }
  });
  const [selectedField, setSelectedField] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("fields", JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === "light" ? "dark" : "light");
  };

  return {
    fields,
    setFields,
    selectedField,
    setSelectedField,
    theme,
    toggleTheme,
  };
}
