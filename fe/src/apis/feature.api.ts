import axiosInstance from "@/configs/axiosInstance";
import { AxiosResponse } from "axios";

// Define the API for the feature
const FeatureAPI = {
  fetchFeatures: async (username: string | null) => {
    const response: AxiosResponse = await axiosInstance.get(
      `/last/${username}`,
    );
    return response.data;
  },

  addFeature: async (username: string | null, formData: FormData) => {
    const values = Object.fromEntries(formData.entries());
    const { title, level } = values;

    const response: AxiosResponse = await axiosInstance.post("/add", {
      username,
      title,
      level,
    });
    return response.data;
  },

  breakFeature: async (id: number | undefined, username: string | null) => {
    const response: AxiosResponse = await axiosInstance.put("/break", {
      id,
      username,
    });

    return response.data;
  },

  resumeFeature: async (
    id: number | undefined,
    username: string | null,
    formData: FormData,
  ) => {
    const values = Object.fromEntries(formData.entries());
    const { level } = values;

    const response: AxiosResponse = await axiosInstance.put("/resume", {
      id,
      username,
      level,
    });

    return response.data;
  },

  finishFeature: async (id: number | undefined, username: string | null) => {
    const response: AxiosResponse = await axiosInstance.put("/finish", {
      id,
      username,
    });

    return response.data;
  },
};

export default FeatureAPI;
