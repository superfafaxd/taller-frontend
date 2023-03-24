import { useDispatch, useSelector } from "react-redux"
import { onShowForm } from "../../../store/home/products/useProductsSlice"


export const useProducts = () => {
    const dispatch = useDispatch()
    const { showForm } = useSelector(state => state.product)

    const showFormAddProduct = () => {
        dispatch(onShowForm())
    }

  return {
    //properties
        showForm,
    //metods
    showFormAddProduct,
  }
}
