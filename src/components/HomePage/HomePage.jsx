import Title from '../Title/Title';
import React, { useEffect, useState } from 'react';
import { EyeOutlined,FormOutlined,StarOutlined,StarFilled  } from '@ant-design/icons';
import { Avatar, Card,Button, Drawer} from 'antd';
import { Link } from 'react-router-dom';
import "./HomePage.css";
import FormCreateEntry from '../FormCreate/FormCreateEntry';
import { fetchEntries } from '../../services/EntriesService';

const HomePage = () => {
  const [entries, setEntries] = useState([]);
  const [animate, setAnimate] = useState(false); //para que la animación inicie al cargar la página
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState({}); //  Estado para controlar si cada entrada es favorita por id 
    //   Este objeto va a tener una estructura tipo:
    // {
    //   1: true,   La entrada con id 1 es favorita
    //   2: false,  La entrada con id 2 no es favorita
    //   3: true,   La entrada con id 3 es favorita
    // }

  useEffect(() => {
    // Espera un pequeño tiempo antes de animar
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Función para cargar entradas
  const loadEntries = () => {
      setLoading(true);
      fetchEntries().then((data) => {
        setEntries(data);
        setLoading(false);
      });
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

  //Recibe el id de la entrada y actualiza el objeto favorites usando el valor anterior (prev).
  const toggleFav = (id) => {
  setFavorites(prev => ({
    ...prev,
    [id]: !prev[id] // cambia true a false o viceversa (sobreescribe el valor)
  }));
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
          {entries.length === 0 ? (loading ? (Array.from({ length: 6 }) //mostrar tarjetas cargando...
            .map((_, i) => (
              <Card
                style={{ width: 280, height: 165 }}
                key={i}
                loading={true}
                cover={<div style={{ backgroundColor: "#4390FD", height: 15, width: 450 }}></div>}
              />
            ))
          ) : (
            // Cuando terminó de cargar pero no hay entradas
            <div className='no-data-card'>
              No hay entradas disponibles.
            </div>
              )
          ): entries.slice(-6).map((entry, index) => ( //sino muestra las últimas 5 entradas
                <Card
                  key={index}
                  style={{ width: 280, height: 165 }}
                  cover={<div style={{ backgroundColor: "#4390FD", height: 15 }}></div>}
                  actions={[
                    <Link to="/entries" key="view">
                      <EyeOutlined />
                    </Link>,

                    favorites[entry.id] ? (
                      <StarFilled
                        key="fav"
                        onClick={() => toggleFav(entry.id)}
                        style={{ color: '#ffd000', cursor: 'pointer' }}
                      />
                    ) : (
                      <StarOutlined
                        key="fav"
                        onClick={() => toggleFav(entry.id)}
                        className="fav-icon"
                      />
                    )
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
