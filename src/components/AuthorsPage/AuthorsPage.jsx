import "./AuthorsPage.css"
import React from 'react';
import Title from "../Title/Title"
import { Table,Button, Drawer,Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined,FormOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';
import { fetchAuthors } from "../../services/AuthorsService";
import FormCreateAuthor from '../FormCreate/FormCreateAuthor';

function AuthorsPage(){
  const [modoEdicion, setModoEdicion] = useState(false); // Si es true, el formulario está en modo editar
  const [autorAEditar, setAutorAEditar] = useState(null); // Datos del autor a editar
  const [authors, setAuthors] = useState([]); //Lista de autores que se va a mostrar en la tabla
  const [open, setOpen] = useState(false); //Controla si el Drawer está abierto o cerrado
  const [loading, setLoading] = useState(true); //para saber si el spinning cargando ya terminó. si no hay autores mostrar un mensaje


  //carga la lista de autores de la bd
  const loadAuthors = () => {
    setLoading(true);
    fetchAuthors().then((data) => {
      setAuthors(data);
      setLoading(false);
    });
  };

  //eliminar un autor. borrado lógico
  async function deleteAuthor(id) {
    await fetch(
      `http://localhost:8080/authors/${id} `,{
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'} }
      );
    loadAuthors();//Una vez eliminado, actualiza la lista de autores
  }
  
  useEffect(() => {
    loadAuthors(); 
  }, []);

  //Abrir el Drawer (crear o editar)
  //Si no se pasa ningún argumento cuando se llama a showDrawer(), entonces autor será null
  const showDrawer = (autor = null) => {
    //si le llega un autor se abre el modo edición
    if (autor) {
      setModoEdicion(true);
      setAutorAEditar(autor);
    } else {
      setModoEdicion(false);
      setAutorAEditar(null);
    }
    //abre el drawer
    setOpen(true);
  };

  const onClose = () => { //cierra el drawer
    setOpen(false);
  };

const columns = [
    {
      title: "Id autor",        
      dataIndex: "id",     
      key: "id"             
    },
    {
      title: "Nombre",        
      dataIndex: "name",      
      key: "name"            
    },
    {
      title: "E-mail",        
      dataIndex: "email",     
      key: "email"            
    },
    {
      title: 'Eliminar',
      dataIndex: 'delete',
      key: 'delete',
      //record = todo el contenido de la fila: id_author,nombre,email
      render: (_,record) => (
        <Popconfirm
              title= {`¿Desea eliminar el autor "${record.name}"?`}
              onConfirm={async () => {
                await deleteAuthor(record.id) //se le pasa el id a eliminar
                 }} 
              okText="Sí, eliminar"
              cancelText="Cancelar"
        >
          <DeleteOutlined
            style={{ color: '#ec2525'}}
          />
        </Popconfirm>
      )
    },
    {
      title: 'Editar',
      dataIndex: 'edit',
      key: 'edit',
      render: (_,record) => (
        
        <EditOutlined 
          //se abre el drawer y le pasa el autor. por ende se abre en modo editar
          onClick={() => showDrawer(record)} 
          style={{ cursor:"pointer", color:'#4390FD' }} 
        />
      )
    }
  ];

return (
  <>
  <Title name="Autores" />

  {/* Abre el Drawer en modo creación porque no se le pasa ningún parámetro */}
  <Button type="primary" onClick={() => showDrawer()} icon={<FormOutlined />} style={{width:250}}>
        Nuevo Autor
  </Button>

  <Drawer 
    title={modoEdicion ? `Editar Autor` : `Ingresar un nuevo autor`}// si está en modo edición muestra como titulo del drawer "editar autor" y si no Ingresar un nuevo autor
    onClose={onClose}
    open={open}
  >
  <FormCreateAuthor 
    onCreateSuccess={() => { //recarga la tabla y cierra el Drawer
      loadAuthors();
      onClose();
    }}
    accion={modoEdicion ? "Editar Autor" : "Crear Autor"} // si está en modo edición muestra como titulo del botón del formulario "editar autor" y si no muestra crear autor
    autor={autorAEditar} // pasa null o un autor. para rellenar campos si está en modo edición
  />
</Drawer>

    <Table 
      rowKey="id"
      style={{ width: "95%" }} 
      columns={columns} dataSource={authors}
      pagination={{ pageSize: 9 }} 
      bordered 
      size="small"
      loading={{ //Mientras cargando === true => se ve el spinner.
        spinning: loading,
        indicator: (
            <div style={{ marginTop: "58px" }}>
              <LoadingOutlined spin size="large" />
            </div>
        )
      }}
      locale={{
      emptyText: !loading ? undefined : "" //muestra el no data que trae ant
      }}
      />

  </>
)
}
export default AuthorsPage;