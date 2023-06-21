import axios from 'axios';

const api = axios.create({
    baseURL: "http://academico3.rj.senac.br/api/AtividadeVerificacao/1"
})
console.log(api); 
export default api;