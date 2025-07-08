// sirve para que no se tenga que hacer el mismo fetch en varios archivos
export async function fetchAuthors() {
  const response = await fetch("http://localhost:8080/authors");
  const data = await response.json();
  return data;
}