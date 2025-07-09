import React from 'react';
import "./RecycleBin.css";
import { Tabs, Table, Popconfirm } from 'antd';
import Title from '../Title/Title';
import { useEffect, useState } from "react";
import { LoadingOutlined, RollbackOutlined, DeleteOutlined} from '@ant-design/icons';

function RecycleBin() {
    const [loading, setLoading] = useState(false);
    const [deletedAuthors, setDeletedAuthors] = useState([]);
    const [deletedEntries, setDeletedEntries] = useState([]);

    async function getDeletedAuthors() {
      setLoading(true);

      const response = await fetch(
          "http://localhost:8080/authors/deleted"
      );
      const data = await response.json();
      setDeletedAuthors(data);

      setLoading(false);
    }

    async function getDeletedEntries() {
      setLoading(true);
      const response = await fetch("http://localhost:8080/entries/deleted");
      const data = await response.json();
      setDeletedEntries(data);
      setLoading(false);
    }

    useEffect(() => {
        getDeletedAuthors();
        getDeletedEntries();
    }, []);

    //funciones para los botones de las columnas acciones 

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

    async function restoreEntry(id) {
      await fetch(`http://localhost:8080/entries/restore/${id}`, {
        method: 'PATCH'
      });
      getDeletedEntries();
    }

    async function deleteEntryPermanently(id) {
      await fetch(`http://localhost:8080/entries/physical/${id}`, {
        method: 'DELETE'
      });
      getDeletedEntries();
    }

    // definimos las columnas para la tabla de entradas eliminadas
    const authorColumns = [
      {
        title: 'Id autor',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>
      },
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Correo electronico',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Accion',
        key: 'action',
        render: (_, record) => (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <Popconfirm
              title="¿Estás seguro de restaurar este registro?"
              onConfirm={() => restoreAuthor(record.id)}
              okText="Sí"
              cancelText="No"
            >
              <button className="restore-btn" title="Restaurar">
                <RollbackOutlined />
              </button>
            </Popconfirm>

            <Popconfirm
              title="¿Eliminar permanentemente?"
              onConfirm={() => deleteAuthorPermanently(record.id)}
              okText="Sí, eliminar"
              cancelText="Cancelar"
            >
              <button className="delete-btn" title="Eliminar">
                <DeleteOutlined />
              </button>
            </Popconfirm>
          </div>
        )
      }
    ]

    // definimos las columnas para la tabla de autores eliminados
    const entriesColumns = [
      {
        title: 'Id entrada',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Id autor',
        dataIndex: 'id_author',
        key: 'id_author',
        render: text => <a>{text}</a>
      },
      {
        title: 'Fecha de creacion',
        dataIndex: 'creation_date',
        key: 'creation_date'
      },
      {
        title: 'Titulo',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Texto',
        dataIndex: 'text',
        key: 'text'
      },
      {
        title: 'Accion',
        key: 'action',
        render: (_, record) => (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center'  }}>
            <Popconfirm
              title="¿Estás seguro de restaurar este registro?"
              onConfirm={() => restoreEntry(record.id)}
              okText="Sí"
              cancelText="No"
            >
              <button className="restore-btn" title="Restaurar">
                <RollbackOutlined />
              </button>
            </Popconfirm>

            <Popconfirm
              title="¿Eliminar permanentemente?"
              onConfirm={() => deleteEntryPermanently(record.id)}
              okText="Sí, eliminar"
              cancelText="Cancelar"
            >
              <button className="delete-btn" title="Eliminar">
                <DeleteOutlined />
              </button>
            </Popconfirm>
          </div>

        )
      }
    ]

    const onChange = key => {
      console.log(key);
      key === "1" ? getDeletedAuthors() : key === "2" ? getDeletedEntries() : null;
    };

    const items = [
      {
        key: '1',
        label: 'Autores',
        children: 
          <Table 
              rowKey="id"
              style={{ width: "95%"}}
              columns={authorColumns} 
              dataSource={deletedAuthors}  
              loading={{
                spinning: loading,
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
        children: 
          <Table 
              rowKey="id"
              style={{ width: "95%"}}
              columns={entriesColumns} 
              dataSource={deletedEntries}  
              loading={{
                spinning: loading,
                indicator: //define qué se va a mostrar como ícono de carga
                <div style={{ marginTop: "58px" }}>
                  <LoadingOutlined spin size="large"/>
                </div>
              }}
              locale={{
                emptyText: !loading ? undefined : "" //muestra el no data que trae ant
              }}
              pagination={{
                pageSize: 9, //cantidad de filas por pagina
              }}
              size='small' //tamaño de la tabla
              bordered //aplica los bordes a la tabla
            />   
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