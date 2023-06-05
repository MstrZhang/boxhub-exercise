interface PageProps {
  children?: React.ReactNode;
  title?: string;
}

export function Page({ children, title }: PageProps) {
  return (
    <>
      <div className="overflow-x mx-8 my-8 lg:container">
        <div className="mb-8 text-3xl font-semibold">{title}</div>
        {children}
      </div>
    </>
  );
}
