import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space,message  } from 'antd';
import { useFormUtils } from '../../hooks/useFormUtils';

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormCreateEntry = ({ onCreateSuccess }) => {
  const { form, loadings, onReset, enterLoading } = useFormUtils();

  //trae los autores disponibles para mostrarlos como opciones
const [authors, setAuthors] = useState([]); //authors array vacío
async function getAuthors() {
          const response = await fetch(
              "http://localhost:8080/authors"
          );
          const data = await response.json();
          setAuthors(data); //actualiza el estado
      }
  
      useEffect(() => {//Cuando el componente se cree, ejecuta la función
          getAuthors();
      }, []); 
 
// Función para manejar el envío del formulario
const onFinish = async (values) => {
  const body = {
    ...values, //copia todos los campos del formulario tal como están
    id_author: parseInt(values.id_author), //sobrescribe el campo id_author. se pasa de string a int (por defecto el form es string y el back espera un id_author int) 
  };

  fetch('http://localhost:8080/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  .then(async (res) => {
    const text = await res.text();// convierte la respuesta a texto plano

    if (!text) return null;

    return JSON.parse(text);
  })
  .then(() => {
        if (onCreateSuccess) {
          onCreateSuccess(); //vuelve a cargar las entradas en HomePage
        }
        form.resetFields(); // limpia el formulario
      })
  .catch((error) => {
    console.error('Error al enviar:', error);
  });
};

  return (
    <Form
      {...layout} //aplica a todos los items lo que se definió en layout(labelCol,wrapperCol)
      form={form}
      name="createInput"
      onFinish={onFinish} // Se ejecuta al hacer submit
    >
      <Form.Item name="title" label="Titulo" rules={[{ required: true }]}>
        <Input placeholder="Ingrese un título"/>
      </Form.Item>

      <Form.Item name="text" label="Texto" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Ingrese el contenido" style={{height:200}}/>
      </Form.Item>

      <Form.Item name="id_author" label="Autor" rules={[{ required: true }]}>
        <Select
          placeholder="Seleccione un autor"
        >
          {authors.map((item)=>{ //muestra los autores disponibles
            return <Option key={item.id} value={item.id}>{item.name}</Option>;
          })}
        
        </Select>
      </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit" loading={loadings[0]} onClick={() => enterLoading(0)}>
            Crear entrada
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          
        </Space>
      </Form.Item>
    </Form>
  );
};
export default FormCreateEntry;