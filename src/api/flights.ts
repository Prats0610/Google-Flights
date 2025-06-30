import axios from "axios";
import type { SearchParams } from "../types/flights";

const API_HOST = "sky-scrapper.p.rapidapi.com";

const axiosInstance = axios.create({
  baseURL: `https://${API_HOST}`,
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": API_HOST,
  },
});
console.log(import.meta.env.VITE_RAPID_API_KEY);
export const searchFlights = async (params: SearchParams) => {
  const res = await axiosInstance.get("/api/v2/flights/searchFlights", {
    params,
  });
  return res.data;
};

export const searchAirport = async (query: string) => {
  const res = await axiosInstance.get("/api/v1/flights/searchAirport", {
    params: { query, locale: "en-US" },
  });
  return res.data;
};
