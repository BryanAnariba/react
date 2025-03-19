import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router";
import { Product } from "../types/products.types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/products.service";

export type ProductDetailsProps = {
  product: Product;
};

export async function action ({params}: ActionFunctionArgs) {
  if (params.product_id){
    const deleted = await deleteProduct(params.product_id.toString());
    console.log('Product deleted: ', deleted);
    return redirect('/');
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const isAvaliable: string = product.avaliable ? "AVALIABLE" : "NO AVALIABLE";
  return (
    <tr className="border-b text-center">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id.toString()}
            className={`${isAvaliable === 'AVALIABLE' ? 'text-black' : 'text-red-600' } rounded-lg uppercase font-bold w-full border border-black-100 p-2 hover:cursor-pointer text-xs`}
          >
            {isAvaliable ? "AVALIABLE" : "NOT AVALIABLE"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 justify-center">
          <button
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
            // onClick={() => navigate(`products/${product.id}/edit`, {
            //   state: {
            //     product: product,
            //   },
            // })}
            onClick={() => navigate(`products/${product.id}/edit`)}
          >
            Edit
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm('Are you sure you want to delete this product?')) {
                e.preventDefault();
              }
            }}
          >
            <input type="submit" value={'Delete'} className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"/>
          </Form>
        </div>
      </td>
    </tr>
  );
}
