import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const GlobalUploadService = createApi({
  reducerPath: "GlobalUploadService",

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // 🔼 Upload Image (Profile, Logo, etc.)
    uploadImage: builder.mutation({
      query: (image) => ({
        url: "img/upload",
        method: "POST",
        body: image, // FormData
      }),
    }),
    updateLogo: builder.mutation({
      query: (url) => ({
        url: "/company/updateLogo",
        method: "PATCH",
        body :url,
      }),
    }),

  }),
});

export const {
  useUploadImageMutation,
  useUpdateLogoMutation
} = GlobalUploadService;
