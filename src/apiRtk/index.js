import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:4000/' ,
  extraOptions: { timeout: 30000 },
  prepareHeaders: (headers, { getState }) => {
    headers.set("content-type", "application/json");
    headers.set("accept", "*/*");
    // let token = getState().login?.token;
    // if (token) headers.set("authorization", `Token ${token}`);
    return headers;
  },
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
return await baseQuery(args, api, extraOptions);
};

export const microserviceApi = createApi({
  reducerPath: "microserviceApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});
