export function initThemeToggle() {
  document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Theme";
    toggleButton.className = "fixed top-4 right-4 px-4 py-2 bg-gray-700 text-white rounded z-50";
    toggleButton.addEventListener("click", () => {
      const current = document.body.className;
      const next = current === "light" ? "dark" : "light";
      document.body.className = next;
      localStorage.setItem("theme", next);
    });
    document.body.appendChild(toggleButton);
  });
}
