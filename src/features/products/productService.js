import axios from "axios";
import { base_url } from "../../utils/utilities";



const getAllProducts = async() =>{
  const response = await axios.get(`${base_url}/products`);

  return response.data;
};




export const productService = {
  getAllProducts
}