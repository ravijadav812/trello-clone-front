import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./BaseQuery";

export const stageAPI = createApi({
  reducerPath: "stageAPI",
  baseQuery: baseQuery,
  tagTypes: ["Stage"],
  endpoints: (builder) => ({
    stages: builder.query({
      query: () => "/stage",
      providesTags: ["Stage"],
    }),
    stage: builder.query({
      query: (id) => `/stage/${id}`,
      providesTags: ["Stage"],
    }),
    addStage: builder.mutation({
      query: (field) => ({
        url: "/stage",
        method: "POST",
        body: field,
      }),
      invalidatesTags: ["Stage"],
    }),
    updateStage: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/stage/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Stage"],
    }),
    deleteStage: builder.mutation({
      query: (id) => ({
        url: `/stage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Stage"],
    }),
  }),
});

export const {
  useStagesQuery,
  useStageQuery,
  useAddStageMutation,
  useUpdateStageMutation,
  useDeleteStageMutation,
} = stageAPI;
