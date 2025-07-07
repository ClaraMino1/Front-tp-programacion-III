import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space,message  } from 'antd';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const FormCreate = () => {
  const [form] = Form.useForm(); //hook de ant. sirve para despues resetear los campos

  const onReset = () => {
    form.resetFields();
  };

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
  
  .catch((error) => {
    console.error('Error al enviar:', error);
  });
};

  return (
    <Form
      {...layout} //aplica a todos los items lo que se definió en layout(labelCol,wrapperCol)
      form={form}
      name="createInput"
      style={{ maxWidth: 600 }}
      onFinish={onFinish} // Se ejecuta al hacer submit
    >
      <Form.Item name="title" label="Titulo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="text" label="Texto" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="id_author" label="Autor" rules={[{ required: true }]}>
        <Select
          placeholder="Selecciona o crea un autor"
        >
          {authors.map((item)=>{ //muestra los autores disponibles
            return <Option key={item.id} value={item.id}>{item.name}</Option>;
          })}
        
          {/* <Option value="create">Nuevo autor</Option> */}
        </Select>
      </Form.Item>
      {/* <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.author !== currentValues.author}
      >
        {({ getFieldValue }) => // Si el usuario selecciona la opción Nuevo autor (value="create"), entonces se renderiza un nuevo campo de Input (createAuthor) para que el usuario pueda escribir el nombre del nuevo autor.
          getFieldValue('id_author') === 'create' ? (
            <Form.Item name="createAuthor" label="Nuevo autor" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item> */}
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
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
export default FormCreate;