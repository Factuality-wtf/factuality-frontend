export const NavBar = () => {
  return (
    <nav className="flex items-center justify-start p-6 h-[12rem]">
      <div className="flex flex-col justify-end items-end text-primary mr-6 p-6">
        <span className="font-normal text-6xl">FACTUALITY</span>
        <span className="font-normal text-6xl">.WTF</span>
      </div>

      <div className="hidden min-h-full w-1/2 flex items-start gap-x-4 mx-16">
        <div className="text-sm">
          <a
            href="#responsive-header"
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
