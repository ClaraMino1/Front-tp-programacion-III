import Title from '../Title/Title';
import React, { useEffect, useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import "./HomePage.css";

const { Meta } = Card;

const HomePage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getEntry() {
      const response = await fetch("http://localhost:8080/entries");
      const data = await response.json();
      setEntries(data);
    }
    getEntry();
  }, []);

  return (
    <>
    <div className='container-home'>
      <Title name="Pagina de inicio" />
      <h2 className='subtitle-home'>Publicaciones <span>recientes</span></h2>

      <div className='div-cards'>
        {entries.length === 0
          ? Array.from({ length: 5 }).map((_, i) => (
              <Card
                key={i}
                loading={true}
                className='cardAnt'
                cover={<div style={{ backgroundColor: "#4390FD", height: 15 }}></div>}
              />
            ))
          : entries.slice(-5).map((entry, index) => (
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
                <Meta
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
