import Title from '../Title/Title';
import React from 'react';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import "./HomePage.css";

const { Meta } = Card;
const HomePage = () => {
    
    return (
        <>
            <Title name="Pagina de inicio" />
            <h2 className='subtitle-home'>Publicaciones recientes</h2>

        <div className='div-cards'>
            <Card
                style={{ width: 300,height: 165}}
               
                cover={
                    <div style={{ backgroundColor: "#4390FD", height: 15 }}></div>
                     }
                actions={[
                <DeleteOutlined key= "delete"/>,
                <EditOutlined key="edit" />
                
                ]}
                >
                    <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Titulo de la entrada"
                    description="descripcion de la entrada"
                    />
            </Card>

            <Card
                style={{ width: 300,height: 165}}
               
                cover={
                    <div style={{ backgroundColor: "#4390FD", height: 15 }}></div>
                     }
                actions={[
                <DeleteOutlined key= "delete"/>,
                <EditOutlined key="edit" />
                
                ]}
                >
                    <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Titulo de la entrada"
                    description="descripcion de la entrada"
                    />
            </Card>

            <Card
                style={{ width: 300,height: 165}}
               
                cover={
                    <div style={{ backgroundColor: "#4390FD", height: 15 }}></div>
                     }
                actions={[
                <DeleteOutlined key= "delete"/>,
                <EditOutlined key="edit" />
                
                ]}
                >
                    <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Titulo de la entrada"
                    description="descripcion de la entrada"
                    />
            </Card>

            <Card
                style={{ width: 300,height: 165}}
               
                cover={
                    <div style={{ backgroundColor: "#4390FD", height: 15 }}></div>
                     }
                actions={[
                <DeleteOutlined key= "delete"/>,
                <EditOutlined key="edit" />
                
                ]}
                >
                    <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Titulo de la entrada"
                    description="descripcion de la entrada"
                    />
            </Card>

            

            
            

          
        </div>
        </>

    )
};




export default HomePage;
