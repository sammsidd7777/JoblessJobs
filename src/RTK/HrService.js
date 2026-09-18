import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const HrService = createApi({
  reducerPath: "HrService",

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    credentials: "include",
  }),

  tagTypes: ["Jobs", "Applications", "Candidate"],

  endpoints: (builder) => ({
    // CREATE JOB
    createJob: builder.mutation({
      query: (jobData) => ({
        url: "/jobs",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // UPDATE JOB
    updateJob: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/jobs/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // DELETE JOB
    deleteJob: builder.mutation({
      query: ({ id }) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // GET HR JOBS
    getAllJobs: builder.query({
      query: () => "/jobs/hr",
      providesTags: ["Jobs"],
    }),

    // GET ALL PUBLIC JOBS
    getAllforJobs: builder.query({
      query: (params = {}) => ({
        url: "/jobs",
        params,
      }),
      providesTags: ["Jobs"],
    }),

    // GET JOB BY ID
    getJobById: builder.query({
      query: (jobId) => `/jobs/${jobId}`,
    }),

    // GET APPLICATIONS
    getApplicationsForJob: builder.query({
      query: (id) => `/applications/job/${id}`,
      providesTags: ["Applications"],
    }),

    // UPDATE JOB ACTIVE STATUS
    updateJobActiveStatus: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // UPDATE APPLICATION STATUS
    updateJobApplyStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/applications/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Applications"],
    }),

    // VIEW CANDIDATE
    viewCandidateDetail: builder.query({
      query: (id) => `/users/candidate/${id}`,
      providesTags: ["Candidate"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetAllJobsQuery,
  useGetApplicationsForJobQuery,
  useUpdateJobActiveStatusMutation,
  useGetAllforJobsQuery,
  useUpdateJobApplyStatusMutation,
  useViewCandidateDetailQuery,
  useGetJobByIdQuery,
} = HrService;