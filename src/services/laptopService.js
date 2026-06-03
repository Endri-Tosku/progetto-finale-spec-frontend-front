import axios from "axios";

const BASE_URL = "http://localhost:3001/laptops";

/*
Recupera tutti i laptop dal backend
*/
export async function getAllLaptops() {
    const response = await axios.get(BASE_URL);

    return response.data;
}