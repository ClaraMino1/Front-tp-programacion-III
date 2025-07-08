import "./AuthorsPage.css"
import React from 'react';
import Title from "../Title/Title"
import { Table,Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined,FormOutlined } from '@ant-design/icons';
import { fetchAuthors } from "../../services/AuthorsService";
import FormCreateAuthor from '../FormCreate/FormCreateAuthor';

function AuthorsPage(){
 const [authors, setAuthors] = useState([]);
  
  const loadAuthors = () => {
    fetchAuthors().then(setAuthors);
  };
  
  useEffect(() => {
    loadAuthors(); 
  }, []);

  const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };

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

  <Button type="primary" onClick={showDrawer} icon={<FormOutlined />} style={{width:250}}>
        Nuevo Autor
  </Button>

  <Drawer 
    title="Ingresar un nuevo autor"
    onClose={onClose}
    open={open}
  >
      {/* prop para que se vuelvan a cargar las entradas en caso de que se cree una nueva */}
    <FormCreateAuthor onCreateSuccess={loadAuthors}/>
  </Drawer>  

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