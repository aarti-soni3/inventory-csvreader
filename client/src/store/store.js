import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware(
        {
            // serializableCheck: {
            //     ignoreActions: [
            //         'api/executeMutation/fulfilled',
            //         'api/executeQuery/fulfilled'
            //     ],
            //     ignoredPaths: ['api.mutations', 'api.queries'],
            // }
        }
    ).concat(api.middleware)
})

setupListeners(store.dispatch)