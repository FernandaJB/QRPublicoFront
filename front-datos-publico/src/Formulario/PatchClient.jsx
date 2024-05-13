import axios from "axios";

export async function PatchCliente(body) {
  console.log("body post", body);

  try {
    const response = await axios.patch(
      `api/v2/update?access_token=${process.env.REACT_APP_API_KEY}`,
      body
    );

    console.log('codigo patch front:',response.data);

    //return response.status;
    return response.data
  } catch (error) {
    // Maneja el error aquí
    //throw error;
    alert('Error al actualizar')
    
  }
}
