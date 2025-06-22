import "./Sidebar.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import ThemeToggle from "../ThemeToggle/ThemeToggle";


// Lista de elementos del menú con sus respectivas rutas y íconos
const items = [
    { key: "/author", icon: <UserOutlined />, label: "Autores" }, // Página de autores
    { key: "/entries", icon: <FileTextOutlined />, label: "Entradas" }, // Página de entradas
    { key: "/entryLogs", icon: <SolutionOutlined />, label: "Logs" }, // Página de logs
    { key: "/recycleBin", icon: <DeleteOutlined />, label: "Papelera" }, // Página de logs
];

// Componente Sidebar
const Sidebar = ({ isDarkMode, toggleTheme }) => {
    const [collapsed, setCollapsed] = useState(false); // Estado para controlar si la sidebar está colapsada o expandida
    const [selectedKey, setSelectedKey] = useState("");
    const navigate = useNavigate(); // Hook para manejar la navegación

    // Función para cambiar el estado de la sidebar
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    // Función para manejar la navegación al hacer clic en un elemento del menú
    const handleMenuClick = ({ key }) => {
        setSelectedKey(key); // actualiza el ítem seleccionado
        navigate(key); // Redirige a la ruta correspondiente
    };

    return (
        <>
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
                    <Link to="/" onClick={() => setSelectedKey("")}>
                        <h2>
                            <span className="collapsedLogo">JS</span>
                            <span className="expandedLogo">Blog</span>
                        </h2>
                    </Link>

                    <Button
                        type="primary"
                        className="toggleButton"
                        onClick={toggleCollapsed}>

                        {collapsed ? <RightOutlined /> : <LeftOutlined />}
                    </Button>
                </header>

                <Menu
                    onClick={handleMenuClick}
                    selectedKeys={[selectedKey]}
                    defaultSelectedKeys={[""]}
                    defaultOpenKeys={[""]}
                    mode="inline"
                    items={items}
                    className="sideMenu"/*esto no deberia hacerse asi*/ 
                />
                <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
            </Sider>
        </>
    );
};

export default Sidebar;
