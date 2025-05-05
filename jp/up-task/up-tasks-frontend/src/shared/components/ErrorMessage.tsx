export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-center my-1 bg-red-100 text-red-600 font-bold uppercase text-sm p-3">
      {children}
    </div>
  );
}
