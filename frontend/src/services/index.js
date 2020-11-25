import axios from  'axios';

const baseAPI = (baseURL)=>{
  const api = axios.create({
    baseURL,
  });

  return app;
}

export default baseAPI;