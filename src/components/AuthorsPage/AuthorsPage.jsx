import "./AuthorsPage.css"
import React from 'react';
import Title from "../Title/Title"
import { Table } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';

function AuthorsPage(){
const [authors, setAuthors] = useState([]);

async function getAuthors() {
    const response = await fetch(
        "http://localhost:8080/authors"
    );
    const data = await response.json();
    setAuthors(Array.isArray(data) ? data : [data]);
}

// async function loadAuthors() {
//     try {
//       const authors = await fetchAuthors();
//       setAuthors(authors);
//     } catch (error) {
//       console.error("Error cargando autores:", error);
//     }
//   }

useEffect(() => {
  getAuthors();
}, []);

const columns = [
    {
      title: "Id autor",        // Texto en la cabecera
      dataIndex: "id",      // Muestra {record.name}
      key: "id"             // Clave de la columna
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
return (
  <>
  <Title name="Autores" />
    <Table 
      rowKey="id"
      style={{ width: "95%" }} 
      columns={columns} dataSource={authors}
      pagination={{ pageSize: 9 }} 
      bordered 
      size="small"
      loading={{
        spinning: !authors.length,
        indicator: (
          <div style={{ marginTop: "58px" }}>
            <LoadingOutlined spin size="large" />
          </div>
        )}}/>
  </>
)
}
export default AuthorsPage;