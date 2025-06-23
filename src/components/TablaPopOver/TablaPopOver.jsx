import "./TablaPopOver.css";
import React, { useEffect, useState } from "react"; // useEffect y useState [Hooks]
import { fetchAuthors } from "../../services/AuthorsService"; // función fetchAuthors desde el servicio
import { Table, Button, Popover, Image } from "antd";
import ImagePreviewButton from "../ImagePreviewButton";
import DefaultImage from "../../assets/AuthorDefaultLogo.png";



const TablaPopOverComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Carga los datos desde la API al montar el componente
    async function loadAuthors() {
      try {
        const authors = await fetchAuthors(); // Llamada al servicio
        const processed = authors.map((author, index) => ({
          key: String(author.id ?? index + 1),
          name: author.name,
          email: author.email,
          image: author.image ?? DefaultImage, // Imagen por defecto si hay Error
        }));
        setData(processed);
      } catch (error) {
        console.error("Error al cargar autores:", error);
      }
    }

    loadAuthors();
  }, []);

  const renderPerfil = (_, record) => (
    <ImagePreviewButton
      image={record.image}
      name={record.name}
      email={record.email}
      buttonText="Ver Author"
    />
  );

  const columns = [
    {
      title: "Perfil",        // Texto en la cabecera
      key: "profile",         // Clave de la columna
      render: renderPerfil,   // Muestra el componente ImagePreviewButton 
    },
    {
      title: "Nombre",        // Texto en la cabecera
      dataIndex: "name",      // Muestra automáticamente record.name
      key: "name"             // Clave de la columna
    },
  ];

  return (
    <div className="tabla-centro">
      <div className="tabla-wrapper">
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
};

export default TablaPopOverComponent;
