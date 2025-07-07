import Title from '../Title/Title';
import React, { useEffect, useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import "./HomePage.css";
import FormCreate from '../FormCreate/FormCreate';

const HomePage = () => {
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

  return (
    <>
    <div className='container-home'>
      <Title name="Pagina de inicio" />
      <h2 className='subtitle-home'>Publicaciones <span>recientes</span></h2>

      <div className='div-cards'>
        {entries.length === 0 //si el array está vacío muestra 5 tarjetas con el efecto de carga
          ? Array.from({ length: 5 }).map((_, i) => ( //crea un array con 5 elementos vacíos. _ porque no se usa el primer parámetro(elemento)
              <Card
                key={i} //indice del array
                loading={true}
                className='cardAnt'
                cover={<div style={{ backgroundColor: "#4390FD", height: 15 }}></div>}
              />
            ))
          : entries.slice(-5).map((entry, index) => ( //sino muestra las últimas 5 entradas
              <Card
                key={index}
                style={{ width: 300, height: 165 }}
                cover={<div style={{ backgroundColor: "#4390FD", height: 15 }}></div>}
                actions={[
                  <Link to="/entries" >
                   <EyeOutlined />
                  </Link>

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
      
      {/* prop para que se vuelvan a cargar las entradas en caso de que se cree una nueva */}
      <FormCreate onCreateSuccess={getEntries}/> 
    </>
  );
};

export default HomePage;
