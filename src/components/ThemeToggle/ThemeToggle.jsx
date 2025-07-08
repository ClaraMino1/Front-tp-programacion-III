
import { useEffect, useState } from "react";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";
import "./ThemeToggle.css";

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setAnimating(true);
    toggleTheme();
  };

  useEffect(() => {
    const timeout = setTimeout(() => setAnimating(false), 300); // tiempo de animación
    return () => clearTimeout(timeout);
  }, [isDarkMode]);

  return (
    <div
      className={`theme-toggle ${isDarkMode ? "dark" : "light"} ${
        animating ? "animating" : ""
      }`}
      onClick={handleClick}
    >
      <div className="toggle-background" />
      <div className="toggle-icons">
        <BulbOutlined className="icon left" />
        <MoonOutlined className="icon right" />
      </div>
      {/* <div className="toggle-indicator" /> */}
    </div>
  );
};

export default ThemeToggle;
