import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const savedJobsApi = createApi({
  reducerPath: "savedJobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/jobs",
    credentials: "include",
  }),
  tagTypes: ["SavedJobs"],
  endpoints: (builder) => ({
    getSavedJobs: builder.query({
      query: () => "/saved-jobs",
      providesTags: ["SavedJobs"], // ✅ Uncommented so cache is tracked
    }),

    deleteSavedJob: builder.mutation({
      query: (id) => ({
        url: `/saved-jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedJobs"],
    }),
    
    savedJob :builder.mutation({
        query:(id) =>({
            url:`/saved-jobs/${id}`,
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
