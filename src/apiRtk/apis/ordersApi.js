import { microserviceApi } from "..";

export const ordersApi = microserviceApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => ({
        url: `orders`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.msg,
    }),
    createOrder: build.mutation({
      query: (body) => ({
        url: `order`,
        method: "POST",
        body: body
      }),
      transformResponse: (response) => response.msg,
      transformErrorResponse: (response) => response.data,
    }),
  })
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation
} = ordersApi;
