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
    title: 'Entrada id',
    dataIndex: 'id_entry',
    key: 'id_entry',
  },
  {
    title: 'Fecha de creacion',
    dataIndex: 'creation_date',
    key: 'creation_date',
  },
  {
    title: 'Descripcion',
    dataIndex: 'description',
    key: 'description',
  }
]

function EntryLog() {
    const [entrylogs, setEntryLog] = useState([]);

    async function getEntryLog() {
        const response = await fetch(
            "http://localhost:8080/entrylogs"
        );
        const data = await response.json();
        setEntryLog(data);
    }

    useEffect(() => {
        getEntryLog();
    }, []);

    return(
      <>
        <Title name="Logs de entradas" />
        <Table columns={columns} dataSource={entrylogs} style={{ width: "95%"}} bordered/>
      </>
    )
}

export default EntryLog;