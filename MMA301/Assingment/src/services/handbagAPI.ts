import { IHandbag } from "../types/handBag.type";
import { API_CONFIG } from "./config";
import axios from "axios";

const BASE_URL = API_CONFIG.BASE_URL;
export const handbagAPI = {
  getAllHandbags: async () => {
    try {
      const response = await axios.get<IHandbag[]>(`${BASE_URL}`);
      return response.data;
    } catch (err) {
      console.error("error at fetching handbags", err);
      throw err;
    }
  },
  getHandbagById: async (id: string) => {
    try {
      const response = await axios.get<IHandbag>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (err) {
      console.error("error at fetching handbag", err);
      throw err;
    }
  },
};
