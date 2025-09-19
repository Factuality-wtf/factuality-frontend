const PaRappaDaWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col items-center md:items-start justify-around min-h-screen overflow-hidden py-4 px-8">
      {children}
    </div>
  );
};

export default PaRappaDaWrapper;
