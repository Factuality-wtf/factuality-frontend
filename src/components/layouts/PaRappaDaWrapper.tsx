const PaRappaDaWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col items-center md:items-start justify-between min-h-screen  md:overflow-x-hidden py-4 px-4 md:px-8 supports-[padding:env(safe-area-inset-bottom)]:pb-[env(safe-area-inset-bottom)]">
      {children}
    </div>
  );
};

export default PaRappaDaWrapper;
