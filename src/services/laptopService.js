import axios from "axios";

/*
 Il service si occupa di trasformare
 la risposta dell'API nel formato
 utile ai componenti React.
*/

const BASE_URL = "http://localhost:3001/laptops";

/*
  Recupera tutti i laptop dal backend
*/
export async function getAllLaptops() {
    const response = await axios.get(BASE_URL);

    return response.data;
}

/*
  Recupera un singolo laptop tramite id.
*/
export async function getLaptopById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);

    return response.data.laptop;
}