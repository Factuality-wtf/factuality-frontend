const PaRappaDaWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col items-start justify-between min-h-screen overflow-hidden p-2">
      {children}
    </div>
  );
};

export default PaRappaDaWrapper;
