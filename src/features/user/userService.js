
import axios from "axios";
import { base_url } from "../../utils/utilities";



const loginUser = async(user) =>{
  const response = await axios.post(`${base_url}/user/login`, user);

  return response.data;
};

const githubAuth = async(gitCode) =>{

  const response = await axios.post(`${base_url}/user/githubAuth/${gitCode}`);
  
  return response.data;
};


const updateUser = async(newUser) =>{

  const response = await axios.put(`${base_url}/user/update`, newUser);

  return response.data;
};


const deleteUser = async(userId) =>{

  const response = await axios.delete(`${base_url}/user/delete/${userId}`);

  return response.data;
};




export const userService = {
  loginUser,
  updateUser,
  deleteUser,
  githubAuth
}