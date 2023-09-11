import axios from "axios";
import { base_url } from "../../utils/utilities";



const getAllProducts = async() =>{
  const response = await axios.get(`${base_url}/products/get-all-products`);

  return response.data;
};


const filterProducts = async(data) =>{
  const response = await axios.post(`${base_url}/products/filter-products`, data);

  return response.data;
};


const getColors = async() =>{
  const response = await axios.get(`${base_url}/colors/get-all-colors`);

  return response.data;
};



export const productService = {
  getAllProducts,
  filterProducts,
  getColors,

}


