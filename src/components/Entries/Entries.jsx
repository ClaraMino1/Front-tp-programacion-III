  import React, { useEffect, useState } from 'react';
  import Title from '../../components/Title/Title';
  import { Table,Popconfirm,Drawer,Button} from 'antd';
  import { LoadingOutlined,DeleteOutlined,StarOutlined,EditOutlined,FormOutlined } from '@ant-design/icons';
  import { fetchEntries } from '../../services/EntriesService';
  import FormCreateEntry from '../FormCreate/FormCreateEntry';

  function Entries() {

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true); //para saber si el spinning cargando ya terminó. si no hay entradas mostrar un mensaje
    const [modoEdicion, setModoEdicion] = useState(false); // Si es true, el formulario está en modo editar
    const [entryToEdit, setEntryToEdit] = useState(null); // Datos de la entrada a editar
    const [open, setOpen] = useState(false); //Controla si el Drawer está abierto o cerrado

    //Abrir el Drawer (crear o editar)
    //Si no se pasa ningún argumento cuando se llama a showDrawer(), entonces entry será null
    const showDrawer = (entry = null) => {
      //si le llega una entrada se abre el modo edición
    if (entry) {
      setModoEdicion(true);
      setEntryToEdit(entry);
    } else {
      setModoEdicion(false);
      setEntryToEdit(null);
    }
    //abre el drawer
    setOpen(true);
    };

    const onClose = () => { //cierra el drawer
      setOpen(false);
    };

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
      title: 'Editar',
      dataIndex: 'edit',
      key: 'edit',
      render: (_,record) => (
        
        <EditOutlined 
          //se abre el drawer y le pasa la entrada. por ende se abre en modo editar
          onClick={() => showDrawer(record)} 
          style={{ cursor:"pointer", color:'#4390FD' }} 
        />
      )
    },
    {
      title: 'Eliminar',
      dataIndex: 'delete',
      key: 'delete',
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

    {/* Abre el Drawer en modo creación porque no se le pasa ningún parámetro */}
    <Button type="primary" onClick={() => showDrawer()} icon={<FormOutlined />} style={{width:250}}>
          Nueva Entrada
    </Button>

      <Drawer 
    title={modoEdicion ? `Editar Entrada` : `Ingresar un nuevo autor`}
    onClose={onClose}
    open={open}
  >
    <FormCreateEntry 
      onCreateSuccess={() => { //recarga la tabla y cierra el Drawer
        loadEntries();
        onClose();
      }}
      action={modoEdicion ? "Editar Entrada" : "Crear Entrada"} 
      entry={entryToEdit} // pasa null o un autor. para rellenar campos si está en modo edición
    />
  </Drawer>
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