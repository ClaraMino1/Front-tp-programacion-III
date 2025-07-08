// sirve para que no se tenga que hacer el mismo fetch en varios archivos
export async function fetchEntryLogs() {
  const response = await fetch("http://localhost:8080/entrylogs");
  const data = await response.json();
  return data;
}