import { ActionFunctionArgs, Link, useLoaderData } from "react-router";
import { editProductAvaliability, getProducts } from "../services/products.service";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types/products.types";

export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  const updated = await editProductAvaliability(data.id.toString());
  console.log('Product updated: ', updated);
  return {};
}


export default function Products() {
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Products</h2>
        <Link
          to={"/products/add"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Add New Product
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (<ProductDetails key={product.id} product={product}/>))}
          </tbody>
        </table>
      </div>
    </>
  );
}
