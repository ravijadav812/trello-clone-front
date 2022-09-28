import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./BaseQuery";

export const alertsAPI = createApi({
  reducerPath: "alertsAPI",
  baseQuery: baseQuery,
  tagTypes: ["Alert"],
  endpoints: (builder) => ({
    alerts: builder.query({
      query: () => "/triggers",
      providesTags: ["Alert"],
    }),
    alert: builder.query({
      query: (id) => `/triggers/${id}`,
      providesTags: ["Alert"],
    }),
    addAlert: builder.mutation({
      query: (field) => ({
        url: "/triggers",
        method: "POST",
        body: field,
      }),
      invalidatesTags: ["Alert"],
    }),
    updateAlert: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/triggers/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["Alert"],
    }),
    deleteAlert: builder.mutation({
      query: (id) => ({
        url: `/triggers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Alert"],
    }),
  }),
});

export const {
  useAlertsQuery,
  useAlertQuery,
  useAddAlertMutation,
  useUpdateAlertMutation,
  useDeleteAlertMutation,
} = alertsAPI;
