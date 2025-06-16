import "./Table.css";


export function Table({ columns, data }) {
  

  return (
    
    <table>
      <thead>
        <tr>
          {columns.map((col) => ( //crea los encabezados de la tabla
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        
        {data && data.length > 0 ? ( //si existe data y tiene contenido

          data.map((row, index) => ( //recorre el fetch. crea filas.le pone como key el indice
            <tr key={index}>
              {columns.map((col) => (//a cada celda le pone un key
                <td key={col.key}>{row[col.key]}</td>//Muestra el dato de esa columna para la fila actual
              ))}
            </tr>
          ))
        ) : (
          <tr> 
            {/* si no data no tiene nada muestra cargando o sin datos */}
            <td colSpan={columns.length}>Cargando o sin datos...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
  

export default Table;
