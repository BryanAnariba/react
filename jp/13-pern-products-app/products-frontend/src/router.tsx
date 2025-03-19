import { createBrowserRouter } from "react-router";
import Layout from "./layouts/Layout";
import Products, {
  loader as productsLoader,
  action as updateProductAvaliability,
} from "./views/Products";
import AddProduct, { action as newProductAction } from "./views/AddProduct";
import EditProduct, {
  loader as loadProduct,
  action as editProduct,
} from "./views/EditProduct";
import { action as deleteProduct } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateProductAvaliability,
      },
      {
        path: "products/add",
        element: <AddProduct />,
        action: newProductAction,
      },
      {
        path: "products/:product_id/edit",
        element: <EditProduct />,
        loader: loadProduct,
        action: editProduct,
      },
      {
        path: "products/:product_id/delete",
        action: deleteProduct,
      },
    ],
  },
]);
