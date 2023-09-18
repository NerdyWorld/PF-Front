
import axios from "axios";
import { base_url } from "../../utils/utilities";



const loginUser = async(user) =>{
  const response = await axios.post(`${base_url}/user/login`, user);

  return response.data;
};


const googleLogin = async(googleUser) =>{

  const response = await axios.post(`${base_url}/user/googleAuth`, googleUser);
  
  return response.data;
};


const githubAuth = async(gitCode) =>{

  const response = await axios.post(`${base_url}/user/githubAuth/${gitCode}`);

  return response.data;
};


const updateUser = async(data) =>{

  const response = await axios.put(`${base_url}/user/update/${data.userId}`, {newUser: data.newUser, oldPassword: data.oldPassword});

  return response.data;
};


const deleteUser = async(userId) =>{

  const response = await axios.delete(`${base_url}/user/delete/${userId}`);

  return response.data;
};


const getUser = async(userId) =>{

  const response = await axios.post(`${base_url}/user/get-users`, {userId});

  return response.data;
};


const sendActivationCode = async(data) =>{

  const response = await axios.post(`${base_url}/user/activationCode`, {email: data.email, firstName: data.firstName, activationCode: data.activationCode});

  return response.data;
};


const validateCredentials = async(data) =>{

  const response = await axios.post(`${base_url}/user/validateCredentials`, {email: data.email, username: data.username});

  return response.data;
};


const createUser = async(data) =>{

  const response = await axios.post(`${base_url}/user/create`, data);

  return response.data;
};


const favToggle = async(data) =>{

  const response = await axios.put(`${base_url}/user/fav-toggle/${data.userId}`, data.item);

  return response.data;
};

const contactPreference = async(data) =>{

  const response = await axios.post(`${base_url}/user/contactPreferences`, {contactPreference: data.contactPreference, userId: data.userId});

  return response.data;
};


const getUserOrders = async(userId) =>{

  const response = await axios.get(`${base_url}/orders/get-user-order/${userId}`);

  return response.data;
};



export const userService = {
  loginUser,
  updateUser,
  deleteUser,
  githubAuth,
  googleLogin,
  getUser,
  sendActivationCode,
  validateCredentials,
  createUser,
  favToggle,
  contactPreference,
  getUserOrders
}