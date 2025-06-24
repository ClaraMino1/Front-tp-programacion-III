import React from 'react';
import "./RecycleBin.css";
import { Tabs, Table } from 'antd';
import Title from '../Title/Title';
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';

function RecycleBin() {
    const [deletedAuthors, setDeletedAuthors] = useState([]);

    async function getDeletedAuthors() {
        const response = await fetch(
            "http://localhost:8080/authors/deleted"
        );
        const data = await response.json();
        setDeletedAuthors(data);
    }

    useEffect(() => {
        getDeletedAuthors();
    }, []);

    async function restoreAuthor(id) {
      await fetch(`http://localhost:8080/authors/restore/${id}`, {
        method: 'PATCH'
      });
      getDeletedAuthors();
    }

    async function deleteAuthorPermanently(id) {
      await fetch(`http://localhost:8080/authors/physical/${id}`, {
        method: 'DELETE'
      });
      getDeletedAuthors();
    }

    const columns = [
      {
        title: 'Id autor',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Correo electronico',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Accion',
        key: 'action',
        render: (_, record) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className='restore-btn'
              onClick={() => restoreAuthor(record.id)}
            >
              Restaurar
            </button>
            <button
              className='delete-btn'
              onClick={() => deleteAuthorPermanently(record.id)}
            >
              Eliminar
            </button>
          </div>
        )
      }
    ]

    const onChange = key => {
      console.log(key);
    };

    const items = [
      {
        key: '1',
        label: 'Autores',
        children: 
          <Table 
              rowKey="id"
              style={{ width: "95%"}}
              columns={columns} 
              dataSource={deletedAuthors}  
              loading={{
                spinning: !deletedAuthors.length, //le dice al componente si debe mostrarse el icono de carga. Se activa (true) cuando entrylogs.length es 0, o sea, cuando todavía no llegaron los datos.
                indicator: //define qué se va a mostrar como ícono de carga
                <div style={{ marginTop: "58px" }}>
                  <LoadingOutlined spin size="large"/>
                </div>
              }}
              pagination={{
                pageSize: 9, //cantidad de filas por pagina
              }}
              size='small' //tamaño de la tabla
              bordered //aplica los bordes a la tabla
            /> 
      },
      {
        key: '2',
        label: 'Entradas',
        children: <Table/> /*traer con un fetch los autores que han sido borrados de manera logica y dar opcion de borrarlos definitivamente, de manera fisica*/
      }
    ];

    return(
      <>
        <Title name="Papelera de reciclaje" />
        <Tabs className='tabs' defaultActiveKey="1" items={items} onChange={onChange} />
      </>
    )
}

export default RecycleBin;