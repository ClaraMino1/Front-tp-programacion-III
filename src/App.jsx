import "./App.css";
import  {Table}  from "./components/Table/Table";
import { useEffect, useState } from "react";

function App() {
    
    const columns = [
    { header: "Autor", key: "id_author" },
    { header: "Título", key: "title" },
    { header: "Contenido", key: "text" },
    { header: "Fecha", key: "creation_date" }
    ];

const [entries, setEntries] = useState(undefined);

  async function getEntries() {
    try {
      const response = await fetch("http://localhost:8080/entries/");
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error al obtener entradas:", error);
    }
  }

  useEffect(() => {
    getEntries();
  }, []);


    return (
        
    <>
        <h1>Entradas</h1>
        {/* se pasa las columnas y un array de objetos(fetch) */}
        <Table columns={columns} data={entries}/>
    </>
    );
}

export default App;
