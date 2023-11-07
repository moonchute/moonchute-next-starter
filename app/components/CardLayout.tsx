export default function CardLayout({ children }: { children: any }) {
  return (
    <div className="flex flex-col justify-around items-center min-w-48 w-full h-40 rounded-2xl border-2 border-zinc-900 m-auto">
      {children}
    </div>
  );
}
