import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;

const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Create Resume
const CreateNewResume = (data) =>
  axiosClient.post("/user-resumes", data);

// Get All Resumes
const GetUserResumes = () =>
  axiosClient.get("/user-resumes?populate=*");

// Get Single Resume
const GetResumeById = (documentId) =>
  axiosClient.get(`/user-resumes?filters[documentId][$eq]=${documentId}&populate=*`);

// Update Resume
// Update Resume - use documentId for Strapi v5
const updateResumeDetail = (documentId, data) => {
  console.log("Updating resume with documentId:", documentId);
  return axiosClient.put(`/user-resumes/${documentId}`, data);
};
const DeleteResume = (documentId) =>
  axiosClient.delete(`/user-resumes/${documentId}`)
export default {
  CreateNewResume,
  GetUserResumes,
  GetResumeById,
  updateResumeDetail,
  DeleteResume,
};