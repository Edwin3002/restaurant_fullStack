import { microserviceApi } from "..";

export const menuApi = microserviceApi.injectEndpoints({
  endpoints: (build) => ({
    getMenus: build.query({
      query: ({ category, page }) => ({
        url: `menus/${category}/${page}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,

    }),
    createMenu: build.mutation({
      query: (body) => ({
        url: `menus`,
        method: "POST",
        body: body
      }),
      transformResponse: (response) => response.msg,
      transformErrorResponse: (response) => response.data,
    }),
  })
});

export const {
  useGetMenusQuery,
  useCreateMenuMutation
} = menuApi;
