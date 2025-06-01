export function generateId() {
// Simple unique id generator
return Math.random().toString(36).substr(2, 9);
}
