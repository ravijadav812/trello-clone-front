import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    headers.set("accept", "*/*");
    headers.set("Cache-Control", "no-cache");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT,PATCH, DELETE, OPTIONS"
    );
    headers.set("Content-Type", "application/json");

    return headers;
  },
});
