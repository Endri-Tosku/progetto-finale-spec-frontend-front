// Axios semplifica le richieste HTTP rispetto a fetch.
// converte automaticamente la risposta JSON e gestisce meglio gli errori 
import axios from "axios";

/*
 Il service si occupa di trasformare
 la risposta dell'API nel formato
 utile ai componenti React.
*/

const BASE_URL = "http://localhost:3001/laptops";


// Recupera tutti i laptop dal backend
export async function getAllLaptops(search = "", category = "") {

  // I parametri search e category vengono passati come query string al backend.
  const response = await axios.get(BASE_URL, {
    // utilizzo await perché axios restituisce una promise e voglio aspettare la risposta prima di continuare l'esecuzione del codice
    // se lo facessi senza await, la funzione restituirebbe una promise e non i dati della risposta

    /*
      I params vengono trasformati automaticamente in query string.
      una query string è una parte dell'URL che permette di passare dei parametri al server.
    */
    params: {
      search,
      category
    }
  });

  // Restituiamo i dati della risposta
  return response.data;
}


// Recupera un singolo laptop tramite id.
export async function getLaptopById(id) {

  // Recuperiamo il laptop dal backend tramite id.
  const response = await axios.get(`${BASE_URL}/${id}`);

  // Restituiamo i dati della risposta
  return response.data.laptop;
}