// sirve para que no se tenga que hacer el mismo fetch en varios archivos
export async function fetchEntries() {
  const response = await fetch("http://localhost:8080/entries");
  const data = await response.json();
  return data;
}