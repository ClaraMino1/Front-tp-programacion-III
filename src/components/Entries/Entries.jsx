  import React, { useEffect, useState } from 'react';
  import Title from '../../components/Title/Title';
  import { Table,Popconfirm } from 'antd';
  import { LoadingOutlined,DeleteOutlined,StarOutlined } from '@ant-design/icons';
  import { fetchEntries } from '../../services/EntriesService';

  function Entries() {

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true); //para saber si el spinning cargando ya terminó. si no hay entradas mostrar un mensaje

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
    },
    {
      title: 'Eliminar',
      dataIndex: 'delete',
      key: 'delete',
      //debe ir text aunque no se use porque render interpreta dos parámetros en ese órden
      //record = todo el contenido de la fila: id,id_author,title,text,creation_date
      render: (_,record) => (
        <Popconfirm
              title= {`¿Desea eliminar la entrada "${record.title}"?`}
              onConfirm={async () => {
                await deleteEntry(record.id) //se le pasa el id a eliminar
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
      title: 'Marcar como favorito',
      dataIndex: 'fav',
      key: 'fav',
      render: (_,record) => (
        
          <StarOutlined
            style={{ color: '#ffd000',cursor:'pointer'}}
          />
        
      )
    }
  ]

  // Función para cargar entradas
  const loadEntries = () => {
    setLoading(true);
    fetchEntries().then((data) => {
      setEntries(data);
      setLoading(false);
    });
  };
    
  useEffect(() => {
    loadEntries(); 
  }, []);

  async function deleteEntry(id) {
    await fetch(
      `http://localhost:8080/entries/${id} `,{
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'} }
      );
    loadEntries();
  }
  
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
      style={{ width: "95%" }}/>
      
    </>
  )
}

export default Entries;