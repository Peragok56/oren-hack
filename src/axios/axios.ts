import axios from "axios";
import { localVariables } from '../variables'

console.log(localVariables.API_URL);


export default axios.create({
    baseURL: `http://${localVariables.API_URL}`
})