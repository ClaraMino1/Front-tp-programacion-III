// import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    UserOutlined,
    LeftOutlined,
    RightOutlined,
    FileTextOutlined,
    SolutionOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";

// Lista de elementos del menú con sus respectivas rutas y íconos
const items = [
    { key: "/author", icon: <UserOutlined />, label: "Autores" }, // Página de autores
    { key: "/entries", icon: <FileTextOutlined />, label: "Entradas" }, // Página de entradas
    { key: "/entryLogs", icon: <SolutionOutlined />, label: "Logs" }, // Página de logs
    { key: "/recycleBin", icon: <DeleteOutlined />, label: "Papelera" }, // Página de logs
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
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            data-collapsed={collapsed}
            theme="light"
            width={250}
            collapsedWidth={80}
            className="sider">
                
            <header>
                <h2>
                    <span className="collapsedLogo">JS</span>
                    <span className="expandedLogo">App</span>
                </h2>

                <Button
                    type="primary"
                    className="toggleButton"
                    onClick={toggleCollapsed}>

                    {collapsed ? <RightOutlined /> : <LeftOutlined />}
                </Button>
            </header>

            <Menu
                onClick={handleMenuClick}
                defaultSelectedKeys={[""]}
                defaultOpenKeys={[""]}
                mode="inline"
                items={items}
                className="sideMenu"/*esto no deberia hacerse asi*/ 
            />
        </Sider>
    );
};

export default Sidebar;
