import Title from '../Title/Title';
import React, { useEffect, useState } from 'react';
import { EyeOutlined,FormOutlined,DeleteOutlined  } from '@ant-design/icons';
import { Avatar, Card,Button, Drawer} from 'antd';
import { Link } from 'react-router-dom';
import "./HomePage.css";
import FormCreateEntry from '../FormCreate/FormCreateEntry';
import { fetchEntries } from '../../services/EntriesService';

const HomePage = () => {
  const [entries, setEntries] = useState([]);
  const [animate, setAnimate] = useState(false); //para que la animación inicie al cargar la página

  useEffect(() => {
    // Espera un pequeño tiempo antes de animar
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Función reutilizable para cargar entradas
  const loadEntries = () => {
    fetchEntries().then(setEntries);
  };

  useEffect(() => {
    loadEntries(); // se ejecuta al montar el componente
  }, []);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
 
  return (
    <>
      <Title name="Pagina de inicio"/>

      <div className='home-container'>
        <h2 className='subtitle-home'>Publicaciones <span className={animate ? 'animate' : ''}>recientes</span></h2>

        <Button type="primary" onClick={showDrawer} icon={<FormOutlined />} className='create-button' style={{width:250}}>
            Crear nueva entrada
        </Button>

        <Drawer 
          title="Crear una nueva entrada"
          width={430}
          onClose={onClose}
          open={open}
        >
        {/* prop para que se vuelvan a cargar las entradas en caso de que se cree una nueva */}
        <FormCreateEntry onCreateSuccess={loadEntries}/>
        </Drawer>   
      

        <div className='div-cards'>
          {entries.length === 0 //si el array está vacío muestra 5 tarjetas con el efecto de carga
            ? Array.from({ length: 6 }).map((_, i) => ( //crea un array con 6 elementos vacíos. _ porque no se usa el primer parámetro(elemento)
                <Card
                  style={{ width: 280, height: 165 }}
                  key={i} //indice del array
                  loading={true}
                  cover={<div style={{ backgroundColor: "#4390FD", height: 15,width:450 }}></div>}
                />
              ))
            : entries.slice(-6).map((entry, index) => ( //sino muestra las últimas 5 entradas
                <Card
                  key={index}
                  style={{ width: 280, height: 165 }}
                  cover={<div style={{ backgroundColor: "#4390FD", height: 15 }}></div>}
                  actions={[
                    <Link to="/entries" >
                      < EyeOutlined />
                    </Link>,

                    <DeleteOutlined
                      className='delete-icon'
                    />

                  ]}
                  
                >
                  <Card.Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={entry.title}
                    description={entry.text}
                  />
                </Card>
              ))}
        </div>
     </div>
    </>
  );
};

export default HomePage;
