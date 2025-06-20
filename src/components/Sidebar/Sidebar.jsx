// import { Link } from "react-router-dom";
import "./Sidebar.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  LeftOutlined,
  RightOutlined,
  FileTextOutlined,
  SolutionOutlined,
  DeleteOutlined,
  JavaScriptOutlined
} from '@ant-design/icons';

import { Button, Menu } from 'antd';

// Lista de elementos del menú con sus respectivas rutas y íconos
const items = [
  { key: '/author', icon: <UserOutlined />, label: 'Autores' }, // Página de autores
  { key: '/entries', icon: <FileTextOutlined />, label: 'Entradas' }, // Página de entradas
  { key: '/entryLogs', icon: <SolutionOutlined />, label: 'Logs' }, // Página de logs
  { key: '/recycleBin', icon: <DeleteOutlined />, label: 'Papelera' }, // Página de logs
];

// Componente Sidebar
const Sidebar = () => {
  // Estado para controlar si la sidebar está colapsada o expandida
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Función para cambiar el estado de la sidebar
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Función para manejar la navegación al hacer clic en un elemento del menú
  const handleMenuClick = ({ key }) => {
    navigate(key); // Redirige a la ruta correspondiente
  };

  return (
    <div className={`sideContainer ${collapsed ? 'collapsed' : ''}`}>
      <div className={"sideFirstDiv"}>
        <div className="logoContainer">
          <JavaScriptOutlined className="logo"/> {/* Cambiar por un logo que nos guste para la app  */}
          <h2 className={`sideTitle ${collapsed ? 'hidden' : ''}`}>Pagina</h2>
        </div>
        <div className={`collapse-button-container ${collapsed ? 'fixed-button' : ''}`}>
          <Button className="btnCollapser" type="primary" onClick={toggleCollapsed}>
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </Button>
        </div>
      </div>

      {/* Menú de navegación con los elementos definidos */}
      <Menu
        onClick={handleMenuClick} // Maneja el clic para cambiar de página
        defaultSelectedKeys={['']} // Página seleccionada por defecto
        defaultOpenKeys={['']} // Sección abierta por defecto
        mode="inline" // Modo de menú en línea
        theme="light" // Tema oscuro
        inlineCollapsed={collapsed} // Ajusta el menú según el estado de la sidebar
        items={items} // Elementos del menú
        className="sideMenu"
      />
    </div>
  );
};

export default Sidebar;
