
import axios from "axios";
import { base_url } from "../../utils/utilities";

const loginUser = async(user) =>{
  const response = await axios.post(`${base_url}/user/login`, user);

  return response.data;
};



export const userService = {
  loginUser
}