import axios from 'axios'

const URL = `http://localhost:8081/login/1/MTIzNDU2/`

const login = async () => {
  // console.log("tuli tähän");
  const response = await axios.get(URL); 
  return response;
}

export default {
    login
}
