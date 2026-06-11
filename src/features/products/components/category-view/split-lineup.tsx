export function SplitLineup({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[900px]">
      {children}
    </section>
  );
}
