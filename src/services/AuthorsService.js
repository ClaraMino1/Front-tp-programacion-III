
export async function fetchAuthors() {
// Solicitud GET a la API
  const response = await fetch("http://localhost/tp-programacion-III/authors");
    //
    // Cambiar para usar con Docker
    //
// Respuesta !200 => Error
  if (!response.ok) throw new Error("Error al obtener autores");

// Convierte la respuesta en JSON y la devuelve
  return await response.json();
}


