import React, { useState } from "react";
import "./ImagePreviewButton.css"
import { Popover, Button, Image } from "antd";

/**
 * Componente que muestra un botón con un popover
 * que contiene imagen + nombre + email + opción de eliminar/restaurar.
 *
 * Props:
 * - image: ruta de la imagen
 * - name: nombre del author
 * - email: correo electrónico
 * - buttonText: texto que aparece en el botón
 */
const ImagePreviewButton = ({ image, name, email, buttonText }) => {
  const [visibleContent, setVisibleContent] = useState(true);

  const SetDisable = () => setVisibleContent(false);
  const SetEnable = () => setVisibleContent(true);

  // Estructura Operador Ternario
  // {condición} ? (valorSiEsVerdadero) : (valorSiEsFalso)
  const content = (
    <div className="container">
      {visibleContent ? (
        <>
          <Image
            src={image}
            width={100}
            style={{ borderRadius: "50%" }}
            preview={false}
          />
          <p className="name-container"><strong>Name:</strong> {name}</p>
          <p><strong>E-Mail:</strong> {email}</p>
          <Button danger size="small" onClick={SetDisable}>
            Eliminar
          </Button>
        </>
      ):(
        <>
          <p className="delete-content"><em>Contenido eliminado.</em></p>
          <Button type="dashed" size="small" onClick={SetEnable}>
            Restaurar
          </Button>
        </>
      )}
    </div>
  );

  return (
    <Popover content={content} trigger="hover">
      <Button type="primary">{buttonText}</Button>
    </Popover>
  );
};

export default ImagePreviewButton;