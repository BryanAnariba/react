import { PropsWithChildren } from "react";

export default function ErrorMsg({ children }: PropsWithChildren) {
  return (
    <p className="bg-red-600 text-white p-2 text-sm text-center font-bold">
      {children}
    </p>
  );
}
