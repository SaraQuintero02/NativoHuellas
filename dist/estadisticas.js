'use strict';

const BASE_URL = "https://www.datos.gov.co/resource/wm9s-qtjx.json";
const tabla = document.querySelector('#tablaNoticias tbody');

async function obtenerDatos() {
  try {
    const respuesta = await axios.get(BASE_URL); 
    const datos = respuesta.data;

    datos.forEach((registro) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${registro.a_o || 'N/A'}</td>
        <td>${registro.fecha_de_realizacion}</td>
        <td>${registro.municipio || 'N/A'}</td>
        <td>${registro.caninos_hembras || '0'}</td>
        <td>${registro.caninos_machos || '0'}</td>
        <td>${registro.felinos_machos || '0'}</td>
        <td>${registro.felinos_hembras || '0'}</td>
        <td>${registro.total_n_de_animales || '0'}</td>
        <td>${registro.decesos || '0'}</td>
      `;
      tabla.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al consumir la API:', error.message);
  }
}
obtenerDatos();







