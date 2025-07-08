import { useState } from 'react';
import { Form } from 'antd';

//éste archivo tiene la función de unificar algunos componentes que se usan en más de un formulario (crear autor y crear entrada)
export function useFormUtils() {
  const [form] = Form.useForm(); //hook de ant. sirve para despues resetear los campos
  const [loadings, setLoadings] = useState([]);

  const onReset = () => form.resetFields();

  const enterLoading = (index) => { //boton cargando
    setLoadings(prev => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    setTimeout(() => {
      setLoadings(prev => {
        const copy = [...prev];
        copy[index] = false;
        return copy;
      });
    }, 3000);
  };

  return { form, loadings, onReset, enterLoading };
}
