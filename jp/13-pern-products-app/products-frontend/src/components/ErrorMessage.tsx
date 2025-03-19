import { PropsWithChildren } from "react";

export default function ErrorMessage({children}: PropsWithChildren) {
  return (
    <div className="text-center text-white bg-red-600 font-bold mt-2 p-3 uppercase">
      {children}
    </div>
  )
}
