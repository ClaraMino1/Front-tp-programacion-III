import React from 'react';

import Title from '../Title/Title';
import { Table } from 'antd';
import { useEffect, useState } from "react";

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>,
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
    const [entries, setEntries] = useState([]);

    async function getEntries() {
        const response = await fetch(
            "http://localhost:8080/entries"
        );
        const data = await response.json();
        setEntries(data);
    }

    useEffect(() => {
        getEntries();
    }, []);

    return(
      <>
        <Title name="Entradas" />
        <Table columns={columns} dataSource={entries} style={{ width: "95%"}} bordered/>
      </>
    )
}

export default Entries;