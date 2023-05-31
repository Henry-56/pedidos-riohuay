
const axios = require('axios');


function list(dni) {
    return axios.get(`https://api.apis.net.pe/v1/dni?numero=${dni}`);
}
  
module.exports={
    list,
    
}