import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { useEmpresaSlice } from "./configuraciones/empresa/useEmpresaSlice";
import { usuariosDataSlice } from "./configuraciones/usuariosSlice";
import { useProductsSlice } from "./home/products/useProductsSlice";
import { useServiciosSlice } from "./home/services/useServiciosSlice";
import { useAutosSlice } from "./home/useAutosSlice";
import { useClientesSlice } from "./home/useClientesSlice";
import { modalSlice } from "./ui/modalSlice";
import { usePaginacionSlice } from "./ui/PaginacionSlice";
import { useSearchSlice } from "./ui/searchSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        usuariosData: usuariosDataSlice.reducer,
        modal: modalSlice.reducer,
        clientesData: useClientesSlice.reducer,
        autosData: useAutosSlice.reducer,
        paginacion: usePaginacionSlice.reducer,
        search: useSearchSlice.reducer,
        service: useServiciosSlice.reducer,
        product: useProductsSlice.reducer,
        empresa: useEmpresaSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})