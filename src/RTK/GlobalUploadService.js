import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GlobalUploadService = createApi({
  reducerPath: "GlobalUploadService",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
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
