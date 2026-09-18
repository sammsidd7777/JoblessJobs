import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const savedJobsApi = createApi({
  reducerPath: "savedJobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    credentials: "include",
  }), 
  tagTypes: ["SavedJobs"],
  endpoints: (builder) => ({
    getSavedJobs: builder.query({
      query: () => "/jobs/saved-jobs",
      providesTags: ["SavedJobs"], // ✅ Uncommented so cache is tracked
    }),

    deleteSavedJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/saved-jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedJobs"],
    }),
    
    savedJob :builder.mutation({
        query:(id) =>({
            url:`/jobs/saved-jobs/${id}`,
            method:"POST",
        }),
        invalidatesTags: ["SavedJobs"], // ✅ Added to trigger UI refetch
    })
  }),
});

export const {
  useGetSavedJobsQuery,
  useDeleteSavedJobMutation,
  useSavedJobMutation
} = savedJobsApi;
