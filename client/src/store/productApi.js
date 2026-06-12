import { api } from "./api";

const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({ url: '/products/getAllProducts', method: 'GET' }),
            providesTags: (result, error, id) => [{ type: 'Product', id: id }]
        }),
        updateDataFromFile: builder.mutation({
            query: (data) => ({ url: '/products/updateDataFromFile', method: 'POST', body: data }),
            invalidatesTags: (result, error, id) => [{ type: 'Product', id: id }]
        }),
    })
})

export const { useGetAllProductsQuery, useUpdateDataFromFileMutation } = productApi