import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/products.service";

export async function action ({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error: string = '';
  if (Object.values(data).includes('')) {
    error = 'All fields are required!';
  }
  if (error !== '') return error;
  const created = await addProduct(data);
  console.log('Product created:', created);
  return redirect('/');
}

export default function AddProduct() {

  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Add Product</h2>
        <Link
          to={"/"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          View all Products
        </Link>
      </div>
      {
        error &&  <ErrorMessage>{error}</ErrorMessage>
      }
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
          />
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
