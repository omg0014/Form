export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function saveFormToLocalStorage(id, form) {
  localStorage.setItem(`form-${id}`, JSON.stringify(form));
}

export function loadFormFromLocalStorage(id) {
  const data = localStorage.getItem(`form-${id}`);
  return data ? JSON.parse(data) : null;
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => alert("Link copied to clipboard!"),
    () => alert("Failed to copy link.")
  );
}
