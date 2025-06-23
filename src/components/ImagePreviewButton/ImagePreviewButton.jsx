import React, { useState } from "react";
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

  const handleRemove = () => setVisibleContent(false);
  const handleRestore = () => setVisibleContent(true);

  const content = (
    <div style={{ textAlign: "center" }}>
      {visibleContent ? (
        <>
          <Image
            src={image}
            width={100}
            style={{ borderRadius: "50%" }}
            preview={false}
          />
          <p style={{ marginTop: 15 }}><strong>Name:</strong> {name}</p>
          <p><strong>E-Mail:</strong> {email}</p>
          <Button danger size="small" onClick={handleRemove}>
            Eliminar
          </Button>
        </>
      ) : (
        <>
          <p style={{ color: "gray" }}><em>Contenido eliminado.</em></p>
          <Button type="dashed" size="small" onClick={handleRestore}>
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