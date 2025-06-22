import React from 'react';
import { Tabs, Table } from 'antd';
import "./RecycleBin.css";
import Title from '../Title/Title';

const onChange = key => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Autores',
    children: <Table/> /*traer con un fetch los autores que han sido borrados de manera logica y dar opcion de borrarlos definitivamente, de manera fisica*/
  },
  {
    key: '2',
    label: 'Entradas',
    children: <Table/> /*traer con un fetch los autores que han sido borrados de manera logica y dar opcion de borrarlos definitivamente, de manera fisica*/
  }
];
const RecycleBin = () => 
    <>
        <Title name="Papelera de reciclaje" />
        <Tabs className='tabs' defaultActiveKey="1" items={items} onChange={onChange} />
    </>
export default RecycleBin;