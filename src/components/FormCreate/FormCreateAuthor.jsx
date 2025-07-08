import { Button, Form, Input, Space  } from 'antd';
import { useFormUtils } from '../../hooks/useFormUtils';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormCreateAuthor = ({ onCreateSuccess }) => {
  const { form, loadings, onReset, enterLoading } = useFormUtils();
 
// Función para manejar el envío del formulario
const onFinish = async (values) => {
  const body = {
    ...values, //copia todos los campos del formulario tal como están
  };

  fetch('http://localhost:8080/authors', {
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
      style={{ maxWidth: 600 }}
      onFinish={onFinish} // Se ejecuta al hacer submit
    >
      <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit" loading={loadings[0]} onClick={() => enterLoading(0)}>
            Crear Autor
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          
        </Space>
      </Form.Item>
    </Form>
  );
};
export default FormCreateAuthor;