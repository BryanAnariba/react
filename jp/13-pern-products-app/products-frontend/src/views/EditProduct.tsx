import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import { editProduct, getProduct } from "../services/products.service";
import { Product } from "../types/products.types";

const avaliabilityOptions = [
  { name: 'AVALIABLE', value: true },
  { name: 'NOT AVALIABLE', value: false }
];

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.product_id) {
    const product = await getProduct(params.product_id.toString());
    if (!product) {
      return redirect("/");
    }
    return product;
  }
  return {};
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error: string = "";
  if (Object.values(data).includes("")) {
    error = "All fields are required!";
  }
  if (error !== "") return error;
  if (params.product_id) {
    const updated = await editProduct(params.product_id!.toString(), data);
    console.log('Product updated: ', updated);
  }
  return redirect("/");
}

export default function EditProduct() {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Edit Product</h2>
        <Link
          to={"/"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          View all Products
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-10" method="POST">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Product Name:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Product Name"
            name="name"
            defaultValue={product.name}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Price:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Product Price. ej. 200, 300"
            name="price"
            step="any"
            defaultValue={product.price}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="avaliable" className="text-gray-800">Avaliability: </label>
          <select name="avaliable" id="avaliable" className="mt-2 block w-full p-3 bg-gray-50">
            {avaliabilityOptions.map(a => (<option value={`${a.value}`} key={a.name}>{a.name}</option>))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Save Product"
        />
      </Form>
    </>
  );
}
