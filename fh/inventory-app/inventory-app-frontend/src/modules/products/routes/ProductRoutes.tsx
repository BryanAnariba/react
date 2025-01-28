import { Navigate, Route } from "react-router"
import { Routes } from "react-router"
import { ProductsLayoutPage } from "../pages/ProductsLayoutPage"
import { ProductListPage } from "../pages/ProductsListPage"
import { ProductPage } from "../pages/ProductPage"
import { CreateProduct } from "../pages/CreateProduct"

export const ProductRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<ProductsLayoutPage />}>
        <Route path="list" element={<ProductListPage />} />
        <Route path=":productId" element={<ProductPage />} />
        <Route path="create" element={<CreateProduct />} />
        <Route path="*" element={<Navigate to={'/products/list'}/>} />
      </Route>
    </Routes>
  )
}