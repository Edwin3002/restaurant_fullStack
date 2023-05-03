import { microserviceApi } from "..";

export const menuApi = microserviceApi.injectEndpoints({
  endpoints: (build) => ({
    getMenu: build.query({
      query: ({ category, page }) => ({
        url: `menus/${category}/${page}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,

    }),
  })
});

export const {
  useGetMenuQuery
} = menuApi;
