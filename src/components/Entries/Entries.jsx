import React, { useEffect, useState } from 'react';
import Title from '../../components/Title/Title';
import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';



const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
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
        <Table 
        rowKey="id"
        columns={columns}
        dataSource={entries}
        
        bordered
        size="small"
        pagination={{ pageSize: 9 }}
        
        
        loading={{
          spinning: !entries.length,
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