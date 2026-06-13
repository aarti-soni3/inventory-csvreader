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
        exportData: builder.mutation({
            query: (data) => ({
                url: '/products/exportData',
                method: 'POST',
                body: data,
                responseHandler: (response) => response.blob()
            }),
            extraOptions: { maxAge: 0 },
        })
    })
})

export const { useGetAllProductsQuery, useUpdateDataFromFileMutation, useExportDataMutation } = productApi