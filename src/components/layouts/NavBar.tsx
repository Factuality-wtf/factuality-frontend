export const NavBar = () => {
  return (
    <nav className="flex items-center justify-start md:items-start w-full md:h-48 md:py-0">
      <a href="/" aria-label="factually.wtf home">
        <div className="flex flex-col justify-end items-end text-primary mr-0 md:mr-6 p-4 md:p-6">
          <span className="text-3xl sm:text-4xl md:text-6xl font-normal leading-tight">
            FACTUALLY
          </span>
          <span className="text-3xl sm:text-4xl md:text-6xl font-normal leading-tight">
            .WTF
          </span>
        </div>
      </a>

      <div className="hidden min-h-full w-1/2 md:hidden items-start gap-x-4 mx-16">
        <div className="text-sm">
          <a href="#responsive-header"
            className="block mt-4 text-2xl text-secondary hover:brightness-120 mr-4"
          >
            Docs
          </a>
        </div>
        <div className="text-sm">
          <a
            href="#responsive-header"
            className="block mt-4 text-2xl text-secondary hover:brightness-120 mr-4"
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
};
