import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider, theme as antdTheme } from "antd";
import Sidebar from "./components/Sidebar/Sidebar";
import HomePage from "./components/HomePage/HomePage";
import EntryLog from "./components/EntryLogs/EntryLog";
import RecycleBin from "./components/RecycleBin/RecycleBin";

// estas dos lineas se van cuando existan los componentes author y entries
const Author = () => <h2>Pagina de autores</h2>;
const Entries = () => <h2>Pagina de entradas</h2>;

const App = () => {
  // Cargar tema inicial desde localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Aplicar clase al body y guardar preferencia cada vez que cambia
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  // Función para alternar tema
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <Router>
        <div className="app-container">
          <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/author" element={<Author />} />
              <Route path="/entries" element={<Entries />} />
              <Route path="/entryLogs" element={<EntryLog />} />
              <Route path="/recycleBin" element={<RecycleBin />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;
