import "./AuthorsPage"

import { useEffect, useState } from "react";
import { fetchAuthors } from "../../services/AuthorsService";
//Ruta desde donde se carga el Servicio

const [authors, setAuthors] = useState([]);

useEffect(() => {
  async function loadData() {
    try {
      const data = await fetchAuthors();
      setAuthors(data);
    } catch (error) {
      console.error("Error cargando autores:", error);
    }
  }

  loadData();
}, []);