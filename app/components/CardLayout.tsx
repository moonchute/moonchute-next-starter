export default function CardLayout({ children }: { children: any }) {
  return (
    <div className="flex flex-col justify-around items-center min-w-48 w-full h-40 p-2 rounded-2xl border-2 border-zinc-900 m-auto xs:p-4 sm:p-5">
      {children}
    </div>
  );
}
