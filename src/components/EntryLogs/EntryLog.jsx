import React from 'react';

import Title from '../../components/Title/Title';
import { Table } from 'antd';
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { fetchEntryLogs } from '../../services/EntryLogsService';

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
      
    const loadEntryLogs = () => {
      fetchEntryLogs().then(setEntryLog);
    };
      
    useEffect(() => {
      loadEntryLogs(); 
    }, []);

    return(
      <>
        <Title name="Logs de entradas" />
        <Table 
          rowKey="id"
          style={{ width: "95%"}}
          columns={columns} 
          dataSource={entrylogs}  
          loading={{
            spinning: !entrylogs.length, //le dice al componente si debe mostrarse el icono de carga. Se activa (true) cuando entrylogs.length es 0, o sea, cuando todavía no llegaron los datos.
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
      </>
    )
}

export default EntryLog;