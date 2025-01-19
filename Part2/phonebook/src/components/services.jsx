
import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const GetAll = () => {
    return axios.get(baseURL).then( result =>{  result.data })
}
