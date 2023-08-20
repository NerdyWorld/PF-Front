import axios from "axios";
import { base_url } from "../../utils/utilities";


const getAllReviews = async() =>{
  const response = await axios.get(`${base_url}/reviews`);

  return response.data;
};


const createReview = async(review) =>{
  const response = await axios.post(`${base_url}/reviews/create`, review);

  return response.data;
};



export const reviewsService = {
  getAllReviews,
  createReview
}