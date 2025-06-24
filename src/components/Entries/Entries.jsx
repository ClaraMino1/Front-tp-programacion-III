import React, { useEffect, useState } from 'react';
import Title from '../../components/Title/Title';
import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


//Cada objeto del array representa una columna
const columns = [
  {
    title: 'Id', //header
    dataIndex: 'id', //contenido
    key: 'id',
  },
  {
    title: 'Autor id',
    dataIndex: 'id_author',
    key: 'id_author',
  },
  {
    title: 'Titulo',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Texto',
    dataIndex: 'text',
    key: 'text',
  },
  {
    title: 'Fecha de creacion',
    dataIndex: 'creation_date',
    key: 'creation_date',
  }
]

function Entries() {
    const [entries, setEntries] = useState([]); //entries array vacío

    async function getEntries() {
        const response = await fetch(
            "http://localhost:8080/entries"
        );
        const data = await response.json();
        setEntries(data); //actualiza el estado de entries
    }

    useEffect(() => {//Cuando el componente se cree, ejecuta la función getEntries
        getEntries();
    }, []); 

    return(
      <>
        <Title name="Entradas" />
        <Table 
        rowKey="id" //cada fila de datos tiene como clave el campo id
        columns={columns}
        dataSource={entries}
        
        bordered
        size="small" //tamaño de celdas
        pagination={{ pageSize: 9 }} //hasta 9 entradas por página
        
        
        loading={{
          spinning: !entries.length, // si entries está vacío → mostrar loading
          indicator: (
            <div style={{ marginTop: "58px" }}>
              <LoadingOutlined spin size="large" />
            </div>
          )
        }}
        style={{ width: "95%" }}/>
      </>
    )
}

export default Entries;