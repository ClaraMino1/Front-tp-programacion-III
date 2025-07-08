import "./TablaPopOver.css";
import React, { useEffect, useState } from "react"; // useEffect y useState [Hooks]
import { fetchAuthors } from "../../services/AuthorsService"; // función fetchAuthors desde el servicio
import { Table, Button, Popover, Image } from "antd";
import ImagePreviewButton from "../ImagePreviewButton/ImagePreviewButton";
import DefaultImage from "../../assets/AuthorDefaultLogo.png";
import { LoadingOutlined } from '@ant-design/icons';


const TablaPopOverComponent = () => {
  const [data, setData] = useState([]);
  //[estado, setEstado] = useState(valorInicial);

  useEffect(() => {
    // Carga los datos desde la API cuando se arma el Componente
    async function loadAuthors() {
      try {
        const authors = await fetchAuthors(); // Llamada al servicio (fetch)
        const processed = authors.map((author) => ({
          key: author.id,
          name: author.name,
          email: author.email,
          image: author.image ?? DefaultImage, // Imagen por defecto si hay Error
        }));
        setData(processed);
      }catch (error){
        console.error("Error al cargar autores:", error);
      }
    }
   loadAuthors();
  // Ejecuta una sola vez al montar el componente
  // No Olvidar '[]' Evita llamadas Repetidas a la API
  },[]);

  const renderButton = (_, record) => (
    <ImagePreviewButton
      image={record.image}
      name={record.name}
      email={record.email}
      buttonText={record.name}
    />
  );

  const columns = [
    {
      title: "Perfil",        // Texto en la cabecera
      key: "profile",         // Clave de la columna
      render: renderButton,   // Muestra el componente ImagePreviewButton 
    },
    {
      title: "Nombre",        // Texto en la cabecera
      dataIndex: "name",      // Muestra {record.name}
      key: "name"             // Clave de la columna
    },
    {
      title: "E-mail",        // Texto en la cabecera
      dataIndex: "email",     // Muestra {record.name}
      key: "email"            // Clave de la columna
    },
  ];
// Importante => si no tengo Render uso dataIndex
  return (
    <div className="tabla-centro">
      <div className="tabla-container">
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 9 }} 
          bordered
          size="small"
          loading={{
            spinning: !data.length,
            indicator: (
              <div style={{ marginTop: "58px" }}>
                <LoadingOutlined spin size="large" />
              </div>
          )
        }}
          />
      </div>
    </div>
  );
};

export default TablaPopOverComponent;